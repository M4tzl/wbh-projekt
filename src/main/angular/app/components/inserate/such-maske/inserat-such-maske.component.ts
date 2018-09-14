import {Component} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {Observable} from "rxjs";
import {SecurityService} from "../../../services/security.service";
import {BreedService} from "../../../services/breed.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inserat} from "../../../model/inserat";
import {Constants} from "../../../model/constants";


export interface SearchFilter {
    rasse: string;
    reinrassig: boolean;
    schulterhoehe: string;
    voraussichtlicheSchulterhoehe: string;
    alterVon: number;
    alterBis: number;
    bundesland: string;
    geschlecht: string;

    kastriert: boolean;
    gechipt: boolean;
    geimpft: boolean;
    stubenrein: boolean;
    leinenfuehrigkeit: boolean;
    autofahren: boolean;
    vertraeglichkeitKinder: boolean;
    vertraeglichkeitKatzen: boolean;
    vertraeglichkeitHunde: boolean;
    zutraulich: boolean;

    zielgruppeAnfaenger: boolean;
    zielgruppeSenioren: boolean;
    zielgruppeGarten: boolean;
    zielgruppeErfahren: boolean;
    zielgruppeFamilien: boolean;

    vermittler: string;
}

@Component({
    selector: 'app-inserat-such-maske',
    templateUrl: './inserat-such-maske.component.html',
    styleUrls: ['./inserat-such-maske.component.scss']
})
export class InseratSuchMaskeComponent {
    filter: SearchFilter;
    rassen: Observable<string[]>;
    constants: Constants = new Constants();

    constructor(public inserateService: InserateService,
                private securityService: SecurityService,
                private breedService: BreedService,
                private route: ActivatedRoute,
                private router: Router) {
        const params = this.route.snapshot.queryParams;
        this.filter = Object.keys(params)
            .reduce((obj, key) => {
                obj[key] = params[key];
                return obj;
            }, <SearchFilter>{
                schulterhoehe: 'beliebig',
                voraussichtlicheSchulterhoehe: 'beliebig',
                bundesland: 'beliebig',
                geschlecht: 'beliebig',
                rasse: 'beliebig'
            });
    }


    ngOnInit(): void {
        this.rassen = this.breedService.loadAll();
    }

    search() {
        const searchParams = Object.keys(this.filter)
            .filter(key => this.valueIsRelevant(this.filter[key]))
            .reduce((obj, key) => {
                obj[key] = this.filter[key];
                return obj;
            }, {});

        this.router.navigate(['/inserate/suche'], {queryParams: searchParams});
    }

    private valueIsRelevant(val): boolean {
        return val !== null && val !== false && val !== '' && val !== 'beliebig';
    }

}

