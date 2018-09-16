import {Component, OnInit} from '@angular/core';
import {Inserat} from '../../../model/inserat';
import {InserateService} from '../../../services/inserate.service';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Kontaktformular} from "../../../model/kontaktformular";
import {KontaktformularService} from "../../../services/kontaktformular.service";
import {update} from "../../../infrastructure/immutable-update";

@Component({
    selector: 'app-inserat-kontakt',
    templateUrl: './inserat-kontakt.component.html',
    styleUrls: ['./inserat-kontakt.component.css']
})
export class InseratKontaktComponent implements OnInit {
    inserat: Inserat;
    data: Kontaktformular = <Kontaktformular> {};
    successfullySent: boolean;

    constructor(private inserateService: InserateService,
                private kontaktformularService: KontaktformularService,
                private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        this.inserat = <Inserat> {};
        const id = this.route.snapshot.params['id'];
        this.inserateService.load(id)
            .pipe(
                tap(result => this.inserat = result)
            ).subscribe(result => this.inserat = result);
    }

    onSubmit(form) {
        if (form.valid) {
            this.kontaktformularService.send(update(this.data, {inseratId: this.inserat.id}))
                .subscribe(result => this.successfullySent = true);
        }
    }

    reset() {
        this.successfullySent = false;
    }

    goBack(): void {
        window.history.back();
    }
}
