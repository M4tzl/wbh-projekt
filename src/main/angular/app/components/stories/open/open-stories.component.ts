import {Component, OnInit, ViewChild} from '@angular/core';
import {StoriesService} from "../../../services/stories.service";
import {MatPaginator} from "@angular/material";
import {StoriesDataSource} from "../../../datasources/stories.dataSource";
import {CurrentUser} from "../../../model/current-user";
import {SecurityService} from "../../../services/security.service";
import {Story} from "../../../model/story";
import {Router} from "@angular/router";
import {update} from "../../../infrastructure/immutable-update";


@Component({
    selector: 'app-open-stories',
    templateUrl: './open-stories.component.html',
    styleUrls: ['./open-stories.component.scss']
})

export class OpenStoriesComponent implements OnInit {
    errorOccured: boolean;
    currentUser: CurrentUser;
    dataSource: StoriesDataSource;
    displayedColumns = ["titel", "actions"];
    initialPageSize = 10;
    pageSizes = [10, 20, 50];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private storiesService: StoriesService,
                private securityService: SecurityService,
                private router: Router) {
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

    createStory(story: Story) {
        this.storiesService.create(update(story, {draft: true}))
            .subscribe(
                result => this.router.navigate(['/stories/edit', result.id]),
                err => this.errorOccured = true
            );
    }
}
