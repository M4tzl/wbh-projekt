import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {InserateDataSource} from "../../../services/inserate.dataSource";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort} from "@angular/material";
import {fromEvent, merge, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {InserateDialogStoryschreiberComponent} from '../storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';
import {SecurityService} from "../../../services/security.service";
import {CurrentUser} from "../../../model/current-user";
import {Inserat} from "../../../model/inserat";


@Component({
    selector: 'app-inserate',
    templateUrl: './inserate-uebersicht.component.html',
    styleUrls: ['./inserate-uebersicht.component.scss']
})
export class InserateUebersichtComponent implements OnInit, AfterViewInit {
    currentUser: CurrentUser;
    dataSource: InserateDataSource;
    displayedColumns= ["id", "lastUpdate", "rufname", "status", "actions"];
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

        this.dataSource.loadInserate('', 'lastUpdate', 'desc', 0, this.initialPageSize);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.searchField.nativeElement,'keyup')
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
            this.searchField.nativeElement.value,
            'lastUpdate',
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    close(inserat: Inserat) {
        this.inserateService.close(inserat)
            .subscribe(result => this.loadInseratePage());
    }

    activate(inserat: Inserat) {
        this.inserateService.activate(inserat)
            .subscribe(result => this.loadInseratePage());
    }

    deactivate(inserat: Inserat) {
        this.inserateService.deactivate(inserat)
            .subscribe(result => this.loadInseratePage());
    }

    setStorySchreiber(inserat){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {inserat};
        this.dialog.open(InserateDialogStoryschreiberComponent, dialogConfig);


    }
}

