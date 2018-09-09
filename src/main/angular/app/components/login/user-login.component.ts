import {Component} from '@angular/core';
import {SecurityService} from "../../services/security.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
    data: any = {};
    loginFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    onSubmit(form) {
        if (form.valid) {
            this.securityService.authenticate({username: this.data.email, password: this.data.password})
                .subscribe(res => this.router.navigateByUrl("/"),
                    err => this.loginFailed = true);
        }
    }

    resetPW(form) {

        console.log("PW Reset durchführen:" + form);

    }

    resetErrors(): void {
        this.loginFailed = false;
    }
}
