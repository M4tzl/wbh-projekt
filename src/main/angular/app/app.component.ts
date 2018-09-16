import {Component} from '@angular/core';
import {SecurityService} from "./services/security.service";
import {CurrentUser} from "./model/current-user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: CurrentUser;
    showConnectionError: boolean;
    widgetMode: boolean;

    constructor(private securityService: SecurityService,
                private route: ActivatedRoute,
                private router: Router) {
        this.securityService.currentUser
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
}
