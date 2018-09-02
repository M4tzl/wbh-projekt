import {Component, OnInit} from "@angular/core";
import {InserateService} from "../../../services/inserate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inserat} from "../../../model/inserat";
import {Observable} from "rxjs";
import {BreedService} from "../../../services/breed.service";

@Component({
    selector: 'app-inserate-detail',
    templateUrl: './inserate-edit.component.html',
    styleUrls: ['./inserate-edit.component.scss']
})
export class InserateEditComponent implements OnInit {
    inserat: Inserat = <Inserat>{};
    rassen: Observable<string[]>;

    constructor(private inserateService: InserateService,
                private breedService: BreedService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.inserateService.load(id)
            .subscribe(result => this.inserat = result);

        this.rassen = this.breedService.loadAll();
    }

    onSubmit() {
        this.inserateService.update(this.inserat)
            .subscribe(result => this.router.navigate(['/inserate']));
    }

    // TODO: auslagern
    get schulterhoehen(): string[] {
        return [
            '<20cm',
            '21-35cm',
            '51-75cm',
            '76-85cm',
            '86-100cm',
            '>100cm',
        ];
    }
}
