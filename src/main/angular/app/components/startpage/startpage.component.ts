import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoriesService} from "../../services/stories.service";
import {CurrentUser} from "../../model/current-user";
import {SecurityService} from "../../services/security.service";
import {catchError, filter, switchMap, tap} from "rxjs/operators";
import {Subscription, throwError} from "rxjs";

@Component({
    selector: 'app-startpage',
    templateUrl: './startpage.component.html',
    styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnDestroy {
    showOpenStories: boolean;
    currentUser: CurrentUser;
    subscription: Subscription;

    constructor(private storiesService: StoriesService,
                private securityService: SecurityService) {
        this.subscription = this.securityService.currentUser
            .pipe(
                catchError(err => {
                    this.currentUser = null;
                    return throwError(err);
                }),
                tap(user => this.currentUser = user),
                filter(user => user != null),
                filter(user => user.isInteressent),
                switchMap(user => this.storiesService.loadOpen(0, 1))
            )
            .subscribe(result => this.showOpenStories = result.stories.length > 0);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
