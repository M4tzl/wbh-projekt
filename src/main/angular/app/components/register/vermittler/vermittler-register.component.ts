import {Component, OnDestroy, OnInit} from '@angular/core';
import {SecurityService} from '../../../services/security.service';
import {Router} from '@angular/router';
import {Vermittler} from "../../../model/vermittler";
import {Constants} from "../../../model/constants";
import {filter, switchMap} from "rxjs/operators";
import {Subscribable, Subscription} from "rxjs";

@Component({
    selector: 'app-vermittler-register',
    templateUrl: './vermittler-register.component.html',
    styleUrls: ['./vermittler-register.component.css']
})
export class VermittlerRegisterComponent implements OnDestroy {
    data: any = {};
    vermittler: Vermittler = <Vermittler>{};
    registrationFailed: boolean = false;
    constants: Constants = new Constants();
    subscription: Subscription;

    constructor(private securityService: SecurityService,
                private router: Router) {
        this.subscription = this.securityService.currentUser.pipe(
            filter(user => user && user.loggedIn),
            switchMap(_ => this.securityService.loadVermittler())
        ).subscribe(result => this.vermittler = result);
    }

    onSubmit(form) {
        if(form.valid) {
            if(this.vermittler.id){
                this.securityService.updateVermittlerRegistration({
                    username: this.vermittler.username,
                    password: this.data.password
                }, this.vermittler)
                    .subscribe(res => this.router.navigateByUrl("/"),
                        err => this.registrationFailed = true);
            } else {
                this.securityService.registerVermittler({
                    username: this.vermittler.username,
                    password: this.data.password
                }, this.vermittler)
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
