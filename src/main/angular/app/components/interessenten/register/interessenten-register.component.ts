import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {SecurityService} from "../../../services/security.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-interessenten-register',
    templateUrl: './interessenten-register.component.html',
    styleUrls: ['./interessenten-register.component.css']
})
export class InteressentenRegisterComponent {
    data: any = {};
    registrationFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    onSubmit() {
        this.securityService.registerInteressent(this.data.email, this.data.password)
            .subscribe(res => this.router.navigateByUrl("/"),
                err => this.registrationFailed = true);
    }

    resetErrors(): void {
        this.registrationFailed = false;
    }
}
