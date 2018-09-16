import {Component} from '@angular/core';
import {SecurityService} from "../../../services/security.service";
import {Router} from "@angular/router";
import {Credentials} from "../../../model/credentials";
import {filter, flatMap} from "rxjs/operators";
import {of, throwError} from "rxjs";

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
    data: Credentials = <Credentials> {};
    loginFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    onSubmit(form) {
        if (form.valid) {
            this.securityService.authenticate(this.data)
                .pipe(
                    flatMap(result => result.loggedIn ? of(result) : throwError(result))
                )
                .subscribe(res => this.router.navigateByUrl("/"),
                    err => this.loginFailed = true);
        }
    }

    resetErrors(): void {
        this.loginFailed = false;
    }
}
