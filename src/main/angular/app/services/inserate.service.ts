import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Inserat} from "../model/inserat";
import {InseratUebersichtResult} from "../model/inserat-uebersicht-result";

@Injectable()
export class InserateService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(rufnameFilter: string,
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<InseratUebersichtResult> {
        return this.httpClient.get<any>(`/inserate/search/byRufname?rufname=${rufnameFilter}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <InseratUebersichtResult> {
                        inserate: result._embedded.inserate,
                        page: result.page
                    })
            );
    }

    public load(id: number): Observable<Inserat> {
        return this.httpClient.get<Inserat>(`/inserate/${id}`);
    }

    public save(inserat: Inserat): Observable<Inserat> {
        if (inserat.id) {
            return this.httpClient.put<Inserat>(`/inserate/${inserat.id}`, inserat);
        }

        return this.httpClient.post<Inserat>('/inserate', inserat);
    }
}
