import {Component} from '@angular/core';
import {StoriesService} from "../../services/stories.service";
import {CurrentUser} from "../../model/current-user";
import {SecurityService} from "../../services/security.service";
import {catchError, filter, switchMap, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
    selector: 'app-startpage',
    templateUrl: './startpage.component.html',
    styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {
    showOpenStories: boolean;
    currentUser: CurrentUser;

    constructor(private storiesService: StoriesService,
                private securityService: SecurityService) {
        this.securityService.currentUser
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

}
