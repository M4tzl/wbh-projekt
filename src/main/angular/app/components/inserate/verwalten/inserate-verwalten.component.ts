import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InserateService} from "../../../services/inserate.service";
import {InserateDataSource} from "../../../datasources/inserate.dataSource";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {EMPTY, fromEvent, merge, of, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, flatMap, map, switchMap, tap} from "rxjs/operators";
import {InserateDialogStoryschreiberComponent} from '../storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';
import {SecurityService} from "../../../services/security.service";
import {CurrentUser} from "../../../model/current-user";
import {Inserat} from "../../../model/inserat";
import {update} from "../../../infrastructure/immutable-update";
import {YesNoDialogComponent} from "../../allgemein/yes-no-dialog/yes-no-dialog.component";


@Component({
    selector: 'app-inserate-verwalten',
    templateUrl: './inserate-verwalten.component.html',
    styleUrls: ['./inserate-verwalten.component.scss']
})
export class InserateVerwaltenComponent implements OnInit, AfterViewInit, OnDestroy {
    currentUser: CurrentUser;
    dataSource: InserateDataSource;
    initialPageSize = 10;
    pageSizes = [10, 20, 50];
    currentUserSubscription: Subscription;

    private static normalDisplayedColumns = ["id", "lastUpdate", "bild", "rufname", "storyschreiber", "status", "actions"];
    private static adminDisplayedColumns = ["id", "lastUpdate", "vermittler", "rufname", "actions"];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchField') searchField: ElementRef;

    constructor(private inserateService: InserateService,
                private securityService: SecurityService,
                public dialog: MatDialog) {
        this.currentUserSubscription = this.securityService.currentUser
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
        const dialogRef = this.dialog.open(InserateDialogStoryschreiberComponent, {
            data: {storyschreiber: inserat.storyschreiber},
            disableClose: true,
            autoFocus: true,
            minWidth: 300
        });

        dialogRef.afterClosed().pipe(
            flatMap(val => val.assigned ? of(val) : EMPTY),
            switchMap(val => this.inserateService.load(inserat.id).pipe( // wir haben aktuell nur die InseratUebersicht, benoetigen aber das ganze Inserat
                map(completeInserat => update(completeInserat, {storyschreiber: val.storyschreiber}))
            )),
            switchMap(completeInserat => this.inserateService.close(completeInserat))
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

    delete(inserat: Inserat) {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            disableClose: true,
            autoFocus: true,
            data: 'Möchten Sie das Inserat wirklich löschen?'
        });

        dialogRef.afterClosed().pipe(
            flatMap(val => val ? of(val) : EMPTY),
            switchMap(i => this.inserateService.delete(inserat))
        ).subscribe(val => this.loadInseratePage());
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    get displayedColumns(): string[] {
        return this.currentUser.isAdmin
            ? InserateVerwaltenComponent.adminDisplayedColumns
            : InserateVerwaltenComponent.normalDisplayedColumns;
    }
}

