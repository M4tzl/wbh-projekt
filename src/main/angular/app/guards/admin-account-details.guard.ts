import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AdminService} from "../services/admin.service";

@Injectable()
export class AdminAccountDetailsGuard implements CanActivate {
    constructor(private adminService: AdminService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const id = route.paramMap.get("id");
        return this.adminService.load(Number(id)).pipe(
            tap(acc => {
                if(acc.roles.indexOf('INTERESSENT') > -1){
                    this.router.navigate(['/stories'], {queryParams: {autor: acc.username}});
                } else if(acc.roles.indexOf('VERMITTLER') > -1) {
                    this.router.navigate(['/inserate/suche'], {queryParams: {vermittler: acc.username}});
                }
            }),
            map(u => true)
        );
    }
}
