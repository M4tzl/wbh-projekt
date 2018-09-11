import {Component} from '@angular/core';
import {SecurityService} from '../../../services/security.service';
import {Router} from '@angular/router';
import {Vermittler} from "../../../model/vermittler";

@Component({
    selector: 'app-vermittler-registry',
    templateUrl: './vermittler-register.component.html',
    styleUrls: ['./vermittler-register.component.css']
})
export class VermittlerRegisterComponent {
    data: any = {};
    vermittler: Vermittler = <Vermittler>{};
    registrationFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    onSubmit(form) {
        if(form.valid) {
            this.securityService.registerVermittler({
                username: this.vermittler.username,
                password: this.data.password
            }, this.vermittler)
                .subscribe(res => this.router.navigateByUrl("/"),
                    err => this.registrationFailed = true);
        }
    }

    resetErrors(): void {
        this.registrationFailed = false;
    }

    get bundeslaender(): string[] {
        return [
            'Baden-Württemberg',
            'Bayern',
            'Berlin',
            'Brandenburg',
            'Bremen',
            'Hamburg',
            'Hessen',
            'Mecklenburg-Vorpommern',
            'Niedersachsen',
            'Nordrhein-Westfalen',
            'Rheinland-Pfalz',
            'Saarland',
            'Sachsen',
            'Sachsen-Anhalt',
            'Schleswig-Holstein',
            'Thüringen']
    }
}
