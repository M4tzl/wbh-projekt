import {SecurityService} from "../services/security.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class UpdateUserGuard implements CanActivate {
    constructor(private securityService: SecurityService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.securityService.authenticate().pipe(
            map(u => true)
        );
    }
}
