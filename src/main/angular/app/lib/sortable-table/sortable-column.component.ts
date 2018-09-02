import {Component, HostListener, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {SortService} from "./sort.service";

@Component({
    selector: '[sortable-column]',
    templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent implements OnInit, OnDestroy {

    constructor(private sortService: SortService) { }

    @Input('sortable-column')
    column: string;

    @Input('sort-direction')
    sortDirection: string = '';

    private columnSortedSubscription: Subscription;

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.column, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.column != event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}
