import {NgModule} from "@angular/core";
import {SortableColumnComponent} from "./sortable-column.component";
import {SortableTableDirective} from "./sortable-table.directive";
import {SortService} from "./sort.service";

@NgModule({
    declarations: [
        SortableColumnComponent,
        SortableTableDirective
    ],
    providers: [
        SortService
    ],
    exports: [
        SortableColumnComponent,
        SortableTableDirective
    ]

})
export class SortableTableModule {
}
