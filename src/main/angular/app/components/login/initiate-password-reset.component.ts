import {Component} from '@angular/core';
import {SecurityService} from "../../services/security.service";
import {Credentials} from "../../model/credentials";

@Component({
  selector: 'app-initiate-password-reset',
  templateUrl: './initiate-password-reset.component.html',
  styleUrls: ['./initiate-password-reset.component.css']
})
export class InitiatePasswordResetComponent {
    data: Credentials = <Credentials>{};
    resetFailed: boolean = false;
    resetSuccessful: boolean = false;

    constructor(private securityService: SecurityService) {
    }

    onSubmit(form) {
        if (form.valid) {
            this.securityService.initiatePasswordReset(this.data)
                .subscribe(res => this.resetSuccessful = true,
                    err => this.resetFailed = true);
        }
    }

    resetErrors(): void {
        this.resetFailed = false;
        this.resetSuccessful = false;
    }
}
