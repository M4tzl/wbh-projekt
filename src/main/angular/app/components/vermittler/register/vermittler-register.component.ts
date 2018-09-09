import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vermittler-registry',
  templateUrl: './vermittler-register.component.html',
  styleUrls: ['./vermittler-register.component.css']
})
export class VermittlerRegisterComponent {
    data: any = {};
    registrationFailed: boolean = false;

    constructor(private securityService: SecurityService,
                private router: Router) {
    }

    onSubmit() {
        this.securityService.registerVermittler(this.data.email, this.data.password)
            .subscribe(res => this.router.navigateByUrl("/"),
                err => this.registrationFailed = true);
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
