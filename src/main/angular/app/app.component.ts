import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "./services/security.service";
import {CurrentUser} from "./model/current-user";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    currentUser: CurrentUser;
    showConnectionError: boolean;
    widgetMode: boolean;
    subscription: Subscription;

    constructor(private securityService: SecurityService,
                private route: ActivatedRoute,
                private router: Router) {
        this.subscription = this.securityService.currentUser
            .subscribe(
                user => {
                    this.currentUser = user;
                    this.showConnectionError = user.retrievalFailed;
                },
                err => {
                    this.currentUser = null;
                    this.showConnectionError = true;
                }
            );
        this.route.queryParams.subscribe(params => {
            this.widgetMode = params['widgetMode'];
        });

    }

    logout() {
        this.securityService.logout()
            .subscribe(res => this.router.navigateByUrl('/'));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
