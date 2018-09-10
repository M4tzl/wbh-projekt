import {InseratStatus} from "./inserat-status";

export interface InseratUebersicht {
    id: number;
    lastUpdate: Date;
    rufname: string;
    status: InseratStatus;

    aktivierbar:boolean;
    deaktivierbar:boolean;
    vermittelbar:boolean;
    loeschbar:boolean;
    editierbar:boolean;

    vermittler:string;
}
