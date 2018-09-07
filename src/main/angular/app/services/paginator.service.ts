import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material";

@Injectable()

export class MatPaginatorIntlGerman extends MatPaginatorIntl {
    itemsPerPageLabel = 'Pro Seite: ';
    nextPageLabel = 'Nächste Seite';
    previousPageLabel = 'Vorherige Seite';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' von ' + length;
    }
}
