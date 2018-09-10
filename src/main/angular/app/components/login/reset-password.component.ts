import {Component} from '@angular/core';
import {Credentials} from "../../model/credentials";
import {SecurityService} from "../../services/security.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    data: Credentials = <Credentials>{};
    resetFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    onSubmit(form) {
        if (form.valid) {
            console.log(this.route.snapshot.paramMap.get('token'));
            this.securityService.resetPassword(this.data, this.route.snapshot.paramMap.get('token'))
                .subscribe(res => this.router.navigateByUrl("/"),
                    err => this.resetFailed = true);
        }
    }

    resetErrors(): void {
        this.resetFailed = false;
    }

}
