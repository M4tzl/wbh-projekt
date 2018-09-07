import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StoriesService} from "../../../services/stories.service";
import {MatPaginator, MatSort} from "@angular/material";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {StoriesDataSource} from "../../../services/stories.dataSource";


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit, AfterViewInit {

    dataSource: StoriesDataSource;
    displayedColumns= ["id", "titel", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('searchField') searchField: ElementRef;

    constructor(private storiesService: StoriesService) {
    }

    ngOnInit() {
        this.dataSource = new StoriesDataSource(this.storiesService);

        this.dataSource.loadStories('', 'titel', 'asc', 0, this.initialPageSize);
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
            this.searchField.nativeElement.value,
            'titel',
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
}
