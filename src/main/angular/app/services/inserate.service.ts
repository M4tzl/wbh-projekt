import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Inserat} from "../model/inserat";
import {InseratUebersichtResult} from "../model/inserat-uebersicht-result";
import {InseratBild} from "../model/inserat-bild";

@Injectable()
export class InserateService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(rufnameFilter: string,
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<InseratUebersichtResult> {
        return this.httpClient.get<any>(`/api/inserate/search/byRufname?rufname=${rufnameFilter}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <InseratUebersichtResult> {
                        inserate: result._embedded.inserate,
                        page: result.page
                    })
            );
    }

    public load(id: number): Observable<Inserat> {
        return this.httpClient.get<Inserat>(`/api/inserate/${id}`);
    }

    public save(inserat: Inserat): Observable<Inserat> {
        if (inserat.id) {
            return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}`, inserat);
        }

        return this.httpClient.post<Inserat>('/api/inserate', inserat);
    }

    public publish(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/publish`, inserat);
    }

    public uploadImage(inseratBild: InseratBild, file: File): Observable<InseratBild> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        if(inseratBild.id){
            return this.httpClient
                .put<InseratBild>(`/api/inserate/${inseratBild.inseratId}/images/${inseratBild.id}`, formData);
        }

        return this.httpClient
            .post<InseratBild>(`/api/inserate/${inseratBild.inseratId}/images`, formData);
    }

    public loadImages(inseratId: number): Observable<InseratBild[]> {
        return this.httpClient.get<InseratBild[]>(`/api/inserate/${inseratId}/images`);
    }
}
