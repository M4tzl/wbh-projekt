import {SecurityService} from "../services/security.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class StartpageRoleGuard implements CanActivate {
    constructor(private securityService: SecurityService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.securityService.currentUser.pipe(
            tap(u => {
                if(u.isInteressent)
                    this.router.navigateByUrl("/interessent");
            }),
            tap(u => {
                if(u.isVermittler)
                    this.router.navigateByUrl("/vermittler");
            }),
            map(u => true)
        );
    }
}
