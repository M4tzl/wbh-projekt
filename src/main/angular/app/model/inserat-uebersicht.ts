import {InseratStatus} from "./inserat-status";

export interface InseratUebersicht {
    id: number;
    lastUpdate: Date;
    rufname: string;
    status: InseratStatus;
    alter: string;
    plz: string;
    ort: string;

    aktivierbar:boolean;
    deaktivierbar:boolean;
    vermittelbar:boolean;
    loeschbar:boolean;
    editierbar:boolean;

    vermittler:string;
    storyschreiber: string;
}
