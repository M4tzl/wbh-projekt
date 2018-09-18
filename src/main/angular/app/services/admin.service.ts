import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AccountUebersichtResult} from "../model/account-uebersicht-result";

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
}
