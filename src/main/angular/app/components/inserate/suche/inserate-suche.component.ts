import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {InserateDataSource} from "../../../datasources/inserate.dataSource";
import {MatPaginator, MatSort} from "@angular/material";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {Inserat} from "../../../model/inserat";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-inserate-suche',
    templateUrl: './inserate-suche.component.html',
    styleUrls: ['./inserate-suche.component.scss']
})
export class InserateSucheComponent implements OnInit, AfterViewInit {
    dataSource: InserateDataSource;
    displayedColumns = ["id", "lastUpdate", "rufname", "rasse", "alter", "plz", "ort", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];
    private queryParams: { key: keyof Inserat, value: string }[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchField') searchField: ElementRef;

    constructor(private inserateService: InserateService,
                private route: ActivatedRoute,
                private router: Router) {
        const params = this.route.snapshot.queryParams;
        this.queryParams = Object.keys(params)
            .map(key => {
                return {key: <keyof Inserat> key, value: params[key]};
            });
    }

    ngOnInit() {
        this.dataSource = new InserateDataSource(this.inserateService);

        this.dataSource.loadInserate(this.queryParams, 'lastUpdate', 'desc', 0, this.initialPageSize);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadInseratePage())
            )
            .subscribe();

    }

    loadInseratePage() {
        this.dataSource.loadInserate(
            this.queryParams,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    newSearch() {
        this.router.navigateByUrl('/inserate/such-maske');
    }

    updateSearch() {
        this.router.navigate(['/inserate/such-maske'], {queryParams: this.route.snapshot.queryParams});
    }
}

