import {Component} from '@angular/core';
import {SecurityService} from "../../../services/security.service";
import {CurrentUser} from "../../../model/current-user";

@Component({
    selector: 'app-interessenten-startpage',
    templateUrl: './anonymous-startpage.component.html',
    styleUrls: ['./anonymous-startpage.component.css']
})
export class AnonymousStartpageComponent {
    private currentUser: CurrentUser;

    constructor(private securityService: SecurityService) {
        securityService.currentUser.subscribe(user => this.currentUser = user);
    }
}
