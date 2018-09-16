import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Inserat} from "../model/inserat";
import {InseratUebersichtResult} from "../model/inserat-uebersicht-result";
import {BildMetadaten} from "../model/bild-metadaten";
import {UploadService} from "./upload.service";
import {BildUploadProgress} from "../model/bild-upload-progress";

@Injectable()
export class InserateService implements UploadService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(filter: { key: keyof Inserat, value: string }[],
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

    public activate(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/activate`, inserat);
    }

    public deactivate(inserat: Inserat): Observable<Inserat> {
        return this.httpClient.put<Inserat>(`/api/inserate/${inserat.id}/deactivate`, inserat);
    }

    public uploadImage(inseratBild: BildMetadaten, file: File): Observable<BildUploadProgress> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        if (inseratBild.id) {
            const req = new HttpRequest('PUT', `/api/inserate/${inseratBild.entityId}/images/${inseratBild.id}`, formData, {
                reportProgress: true
            });

            return this.httpClient
                .request(req)
                .pipe(
                    map(this.getEventMessage)
                );
        }

        const req = new HttpRequest('POST', `/api/inserate/${inseratBild.entityId}/images`, formData, {
            reportProgress: true
        });

        return this.httpClient
            .request(req)
            .pipe(
                map(this.getEventMessage)
            );
    }

    public loadImages(inseratId: number): Observable<BildMetadaten[]> {
        return this.httpClient.get<BildMetadaten[]>(`/api/inserate/${inseratId}/images`)
            .pipe(
                map(result => result.map(this.mapInseratBildToBildMetadaten))
            );
    }

    private getEventMessage(event: HttpEvent<any>): BildUploadProgress {
        switch (event.type) {
            case HttpEventType.Sent:
                return {finished: false, progress: 0, result: null};

            case HttpEventType.UploadProgress:
                return {finished: false, progress: Math.round(100 * event.loaded / event.total), result: null}

            case HttpEventType.Response:
                return {
                    finished: true, progress: 100,
                    result: <BildMetadaten> {
                        id: event.body.id,
                        entityId: event.body.inseratId,
                        bildKey: event.body.bildKey,
                        imageUrl: `/api/inserate/${event.body.inseratId}/images/${event.body.bildKey}`
                    }
                };

            case HttpEventType.User:
            case HttpEventType.DownloadProgress:
            case HttpEventType.ResponseHeader:
                return {finished: false, progress: 100, result: null};

            default:
                throw event;
        }
    }

    private mapInseratBildToBildMetadaten(inseratBild): BildMetadaten {
        return <BildMetadaten> {
            id: inseratBild.id,
            entityId: inseratBild.inseratId,
            bildKey: inseratBild.bildKey,
            imageUrl: `/api/inserate/${inseratBild.inseratId}/images/${inseratBild.bildKey}`
        }
    }
}
