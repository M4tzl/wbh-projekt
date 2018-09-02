import {Component} from '@angular/core';
import {InseratUebersicht} from "../../model/inserat-uebersicht";
import {InserateService} from "../../services/inserate.service";
import {ColumnSortedEvent} from "../sortable-table/sort.service";


@Component({
    selector: 'app-inserate',
    templateUrl: './inserate.component.html',
    styleUrls: ['./inserate.component.scss']
})
export class InserateComponent {
    inserate: InseratUebersicht[];

    constructor(private inserateService: InserateService) {
        this.loadInserate();
    }

    onSorted(evt: ColumnSortedEvent){
        this.loadInserate(evt);
    }

    private loadInserate(sortEvent?: ColumnSortedEvent) {
        const sortColumn = (sortEvent || ({} as ColumnSortedEvent)).sortColumn;
        const sortDirection = (sortEvent || ({} as ColumnSortedEvent)).sortDirection;
        this.inserateService.loadAll(sortColumn, sortDirection)
            .subscribe(result => this.inserate = result);
    }
}
