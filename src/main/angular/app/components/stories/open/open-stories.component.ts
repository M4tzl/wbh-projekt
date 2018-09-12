import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StoriesService} from "../../../services/stories.service";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {StoriesDataSource} from "../../../datasources/stories.dataSource";
import {CurrentUser} from "../../../model/current-user";
import {SecurityService} from "../../../services/security.service";


@Component({
  selector: 'app-open-stories',
  templateUrl: './open-stories.component.html',
  styleUrls: ['./open-stories.component.scss']
})

export class OpenStoriesComponent implements OnInit {
    currentUser: CurrentUser;
    dataSource: StoriesDataSource;
    displayedColumns= ["id", "titel", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private storiesService: StoriesService,
                private securityService: SecurityService,
                public dialog: MatDialog) {
        this.securityService.currentUser
            .subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
        this.dataSource = new StoriesDataSource(this.storiesService);

        this.dataSource.loadOpenStories(0, this.initialPageSize);
    }

    loadStoriesPage() {
        this.dataSource.loadOpenStories(
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
}
