import { Component, OnInit } from '@angular/core';
import { Inserat } from '../../../model/inserat';
import { InserateService } from '../../../services/inserate.service';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inserat-kontakt',
  templateUrl: './inserat-kontakt.component.html',
  styleUrls: ['./inserat-kontakt.component.css']
})
export class InseratKontaktComponent implements OnInit {
    inserat: Inserat;
    data: any = {};

    constructor(private inserateService: InserateService,
        private location: Location,
        private route: ActivatedRoute) {
}


ngOnInit(): void {
    this.inserat = <Inserat> {};
    const id = this.route.snapshot.params['id'];
    this.inserateService.load(id)
    .pipe(
        tap(result => this.inserat = result),
        map(inserat => inserat.id)).subscribe(result => this.inserat.id = result);
}
onSubmit(form){
    if (form.valid) {
        console.log("Mail versenden:" + form);
    }
}

goBack(): void {
    this.location.back();
}
}
