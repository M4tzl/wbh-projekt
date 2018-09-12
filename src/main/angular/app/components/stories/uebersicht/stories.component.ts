import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StoriesService} from "../../../services/stories.service";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {EMPTY, fromEvent, merge, of} from "rxjs";
import {debounceTime, distinctUntilChanged, flatMap, switchMap, tap} from "rxjs/operators";
import {StoriesDataSource} from "../../../datasources/stories.dataSource";
import {CurrentUser} from "../../../model/current-user";
import {SecurityService} from "../../../services/security.service";
import {Story} from "../../../model/story";
import {YesNoDialogComponent} from "../../allgemein/yes-no-dialog/yes-no-dialog.component";


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit, AfterViewInit {
    currentUser: CurrentUser;
    dataSource: StoriesDataSource;
    displayedColumns= ["id", "titel", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchField') searchField: ElementRef;

    constructor(private storiesService: StoriesService,
                private securityService: SecurityService,
                public dialog: MatDialog) {
        this.securityService.currentUser
            .subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
        this.dataSource = new StoriesDataSource(this.storiesService);

        this.dataSource.loadStories([], 'titel', 'asc', 0, this.initialPageSize);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.searchField.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadStoriesPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadStoriesPage())
            )
            .subscribe();

    }

    loadStoriesPage() {
        this.dataSource.loadStories(
            [
                {key: "titel", value: this.searchField.nativeElement.value}
            ],
            'titel',
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    deleteStory(story: Story) {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            disableClose: true,
            autoFocus: true,
            data: 'Möchten Sie die Story wirklich löschen?'
        });

        dialogRef.afterClosed().pipe(
            flatMap(val => val ? of(val) : EMPTY),
            switchMap(i => this.storiesService.delete(story.id))
        ).subscribe(val => this.loadStoriesPage());
    }
}
