import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {InseratUebersicht} from "../model/inserat-uebersicht";
import {Inserat} from "../model/inserat";

@Injectable()
export class InserateService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(sort?: string, sortDirection?: string): Observable<InseratUebersicht[]> {
        let url = "/inserate";
        if(sort){
            url += "?sort=" + sort;
            if(sortDirection){
                url += ","+sortDirection;
            }
        }

        return this.httpClient.get<any>(url)
            .pipe(
                map(result => result._embedded.inserate)
            );
    }

    public load(id: number): Observable<Inserat> {
        return this.httpClient.get<Inserat>(`/inserate/${id}`);
    }
}
