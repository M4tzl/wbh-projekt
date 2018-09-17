import {Component, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {SecurityService} from "../../../services/security.service";
import {Router} from "@angular/router";
import {Credentials} from "../../../model/credentials";
import {filter, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-interessenten-register',
    templateUrl: './interessenten-register.component.html',
    styleUrls: ['./interessenten-register.component.css']
})
export class InteressentenRegisterComponent implements OnDestroy {
    data: { id?: number, username: string, password: string, confirmPassword: string } = {
        id: null,
        username: '',
        password: '',
        confirmPassword: ''
    };

    registrationFailed: boolean = false;
    subscription: Subscription;

    constructor(private securityService: SecurityService,
                private router: Router) {
        this.subscription = this.securityService.currentUser
            .subscribe(result => {
                this.data.id = result.id;
                this.data.username = result.userName;
            });
    }

    onSubmit(form) {
        if(form.valid) {
            if(this.data.id){
                this.securityService.updateInteressentRegistration(this.data)
                    .subscribe(res => this.router.navigateByUrl("/"),
                        err => this.registrationFailed = true);
            } else {
                this.securityService.registerInteressent(this.data)
                    .subscribe(res => this.router.navigateByUrl("/"),
                        err => this.registrationFailed = true);
            }
        }
    }

    resetErrors(): void {
        this.registrationFailed = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
