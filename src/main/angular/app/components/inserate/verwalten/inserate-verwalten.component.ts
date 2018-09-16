import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {InserateDataSource} from "../../../datasources/inserate.dataSource";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort} from "@angular/material";
import {EMPTY, fromEvent, merge, of} from "rxjs";
import {debounceTime, distinctUntilChanged, flatMap, switchMap, tap} from "rxjs/operators";
import {InserateDialogStoryschreiberComponent} from '../storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';
import {SecurityService} from "../../../services/security.service";
import {CurrentUser} from "../../../model/current-user";
import {Inserat} from "../../../model/inserat";


@Component({
    selector: 'app-inserate-verwalten',
    templateUrl: './inserate-verwalten.component.html',
    styleUrls: ['./inserate-verwalten.component.scss']
})
export class InserateVerwaltenComponent implements OnInit, AfterViewInit {
    currentUser: CurrentUser;
    dataSource: InserateDataSource;
    displayedColumns = ["id", "lastUpdate", "bild", "rufname", "storyschreiber", "status", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchField') searchField: ElementRef;

    constructor(private inserateService: InserateService,
                private securityService: SecurityService,
                public dialog: MatDialog) {
        this.securityService.currentUser
            .subscribe(user => this.currentUser = user);

    }

    ngOnInit() {
        this.dataSource = new InserateDataSource(this.inserateService);

        this.dataSource.loadInserate([], 'lastUpdate', 'desc', 0, this.initialPageSize);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.searchField.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadInseratePage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadInseratePage())
            )
            .subscribe();

    }

    loadInseratePage() {
        this.dataSource.loadInserate(
            [
                {key: "rufname", value: this.searchField.nativeElement.value}
            ],
            'lastUpdate',
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    close(inserat: Inserat) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(InserateDialogStoryschreiberComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            flatMap(val => val.assigned ? of(val) : EMPTY),
            switchMap(val => this.inserateService.assignStoryschreiber(inserat.id, val.storyschreiber))
        ).subscribe(val => this.loadInseratePage());
    }

    activate(inserat: Inserat) {
        this.inserateService.activate(inserat)
            .subscribe(result => this.loadInseratePage());
    }

    deactivate(inserat: Inserat) {
        this.inserateService.deactivate(inserat)
            .subscribe(result => this.loadInseratePage());
    }
}

