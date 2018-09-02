import {InseratUebersicht} from "./inserat-uebersicht";

export interface Inserat extends InseratUebersicht {
    rassenFreitext:string;
    geschlecht:string;
    geburtsdatum:Date;
    kurzbeschreibung:string;

    rasse: Rasse;

    schulterhoehe: Schulterhoehe;
    voraussichtlicheSchulterhoehe: Schulterhoehe;

    kastriert:boolean;
    gechipt:boolean;
    geimpft:boolean;
    stubenrein:boolean;
    leinenfuehrigkeit:boolean;
    autofahren:boolean;
    vertraeglichkeitKinder:boolean;
    vertraeglichkeitKatzen:boolean;
    vertraeglichkeitHunde:boolean;
    zutraulich:boolean;

    zielgruppeAnfaenger:boolean;
    zielgruppeSenioren:boolean;
    zielgruppeGarten:boolean;
    zielgruppeErfahren:boolean;
    zielgruppeFamilien:boolean;

}

export interface Rasse {
    id: number;
    bezeichnung:string;
}

export interface Schulterhoehe {
    id: number;
    wert:string;
}
