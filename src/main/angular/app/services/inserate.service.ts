import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Inserat} from "../model/inserat";
import {InseratUebersichtResult} from "../model/inserat-uebersicht-result";
import {BildMetadaten} from "../model/bild-metadaten";
import {UploadService} from "./upload.service";

@Injectable()
export class InserateService implements UploadService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(filter: {key: keyof Inserat, value: string}[],
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<InseratUebersichtResult> {
        const filterString = filter.map(entry => `${entry.key}=${entry.value}`)
            .join('&');

        return this.httpClient.get<any>(`/api/inserate?${filterString}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <InseratUebersichtResult> {
                        inserate: result.content,
                        page: result
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

    public close(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/close`, inserat);
    }

    public assignStoryschreiber(id: number, storyschreiber: string): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${id}/storyschreiber`, storyschreiber);
    }

    public activate(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/activate`, inserat);
    }

    public deactivate(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/deactivate`, inserat);
    }

    public uploadImage(inseratBild: BildMetadaten, file: File): Observable<BildMetadaten> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        if(inseratBild.id){
            return this.httpClient
                .put<BildMetadaten>(`/api/inserate/${inseratBild.entityId}/images/${inseratBild.id}`, formData)
                .pipe(
                    map(this.mapInseratBildToBildMetadaten)
                );
        }

        return this.httpClient
            .post<BildMetadaten>(`/api/inserate/${inseratBild.entityId}/images`, formData)
            .pipe(
                map(this.mapInseratBildToBildMetadaten)
            );
    }

    public loadImages(inseratId: number): Observable<BildMetadaten[]> {
        return this.httpClient.get<BildMetadaten[]>(`/api/inserate/${inseratId}/images`)
            .pipe(
                map(result => result.map(this.mapInseratBildToBildMetadaten))
            );
    }

    private mapInseratBildToBildMetadaten(inseratBild) : BildMetadaten{
        return <BildMetadaten> {
            id: inseratBild.id,
            entityId: inseratBild.inseratId,
            bildKey: inseratBild.bildKey,
            imageUrl: `/api/inserate/${inseratBild.inseratId}/images/${inseratBild.bildKey}`
        }
    }
}
