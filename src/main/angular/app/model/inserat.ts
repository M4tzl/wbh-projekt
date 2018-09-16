import {InseratUebersicht} from "./inserat-uebersicht";

export interface Inserat extends InseratUebersicht {
    created: Date;

    rassenFreitext:string;
    geschlecht:string;
    geburtsdatum:Date;
    kurzbeschreibung:string;

    rasse: string;

    schulterhoehe: string;
    voraussichtlicheSchulterhoehe: string;

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

    storyschreiber: string;
    bundesland: string;

}
