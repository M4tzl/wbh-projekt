import {Component} from '@angular/core';
import {SecurityService} from "./services/security.service";
import {CurrentUser} from "./model/current-user";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: CurrentUser;
    showConnectionError: boolean;

    constructor(private securityService: SecurityService,
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
    }

    logout() {
        this.securityService.logout()
            .subscribe(res => this.router.navigateByUrl('/'));
    }
}
