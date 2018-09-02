import {InseratStatus} from "./inserat-status";

export interface InseratUebersicht {
    id: number;
    lastUpdate: Date;
    rufname: string;
    status: InseratStatus;
}
