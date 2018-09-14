import {Component} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {Observable} from "rxjs";
import {SecurityService} from "../../../services/security.service";
import {BreedService} from "../../../services/breed.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inserat} from "../../../model/inserat";


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
    filter: SearchFilter = <SearchFilter>{};
    rassen: Observable<string[]>;

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
            }, <SearchFilter> {});
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


    // TODO: auslagern
    get schulterhoehen(): string[] {
        return [
            'beliebig',
            '<20cm',
            '21-35cm',
            '51-75cm',
            '76-85cm',
            '86-100cm',
            '>100cm',
        ];
    }

    get altersstufen(): { value: number, displayName: string }[] {
        return [
            {value: 50 * 365, displayName: "beliebig"},
            {value: 21, displayName: "3 Wochen"},
            {value: 365, displayName: "1 Jahr"},
            {value: 2 * 365, displayName: "2 Jahre"},
            {value: 3 * 365, displayName: "3 Jahre"},
            {value: 5 * 365, displayName: "5 Jahre"},
            {value: 8 * 365, displayName: "8 Jahre"}
        ];
    }

    get bundeslaender(): string[] {
        return [
            'beliebig',
            'Baden-Württemberg',
            'Bayern',
            'Berlin',
            'Brandenburg',
            'Bremen',
            'Hamburg',
            'Hessen',
            'Mecklenburg-Vorpommern',
            'Niedersachsen',
            'Nordrhein-Westfalen',
            'Rheinland-Pfalz',
            'Saarland',
            'Sachsen',
            'Sachsen-Anhalt',
            'Schleswig-Holstein',
            'Thüringen']
    }
}

