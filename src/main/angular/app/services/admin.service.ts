import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AccountUebersichtResult} from "../model/account-uebersicht-result";
import {Inserat} from "../model/inserat";
import {AccountUebersicht} from "../model/account-uebersicht";

@Injectable()
export class AdminService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(username: string,
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<AccountUebersichtResult> {

        return this.httpClient.get<any>(`/api/admin/users?username=${username}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <AccountUebersichtResult> {
                    accounts: result.content,
                    page: result
                })
            );
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<Inserat>(`/api/admin/users/${id}`);
    }

    public load(id: number): Observable<AccountUebersicht> {
        return this.httpClient.get<AccountUebersicht>(`/api/admin/users/${id}`);
    }

}
