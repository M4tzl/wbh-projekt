import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Story} from "../model/story";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {map} from "rxjs/operators";
import {StoriesResult} from "../model/stories-result";
import {BildMetadaten} from "../model/bild-metadaten";
import {UploadService} from "./upload.service";
import {Inserat} from "../model/inserat";
import {BildUploadProgress} from "../model/bild-upload-progress";

@Injectable()
export class StoriesService implements UploadService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(filter: { key: keyof Story, value: string }[],
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<StoriesResult> {
        const filterString = filter.map(entry => `${entry.key}=${entry.value}`)
            .join('&');

        return this.httpClient.get<any>(`/api/stories?${filterString}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <StoriesResult> {
                    stories: result.content,
                    page: result
                })
            );
    }

    public loadOpen(page: number, pageSize: number): Observable<StoriesResult> {
        return this.httpClient.get<any>(`/api/stories/open?&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <StoriesResult> {
                    stories: result.content,
                    page: result
                })
            );
    }

    public load(id: number): Observable<Story> {
        return this.httpClient.get<Story>("/api/stories/" + id);
    }

    public delete(id: number): Observable<Story> {
        return this.httpClient.delete<Story>("/api/stories/" + id);
    }

    public update(story: Story): Observable<Story> {
        return this.httpClient.put<Story>(`/api/stories/${story.id}`, story);
    }

    public create(story: Story): Observable<Story> {
        return this.httpClient.post<Story>(`/api/stories`, story);
    }

    public uploadImage(storyBild: BildMetadaten, file: File): Observable<BildUploadProgress> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        if (storyBild.id) {
            const req = new HttpRequest('PUT', `/api/stories/${storyBild.entityId}/images/${storyBild.id}`, formData, {
                reportProgress: true
            });

            return this.httpClient
                .request(req)
                .pipe(
                    map(this.getEventMessage)
                );
        }

        const req = new HttpRequest('POST', `/api/stories/${storyBild.entityId}/images`, formData, {
            reportProgress: true
        });

        return this.httpClient
            .request(req)
            .pipe(
                map(this.getEventMessage)
            );
    }

    public loadImages(storyId: number): Observable<BildMetadaten[]> {
        return this.httpClient.get<BildMetadaten[]>(`/api/stories/${storyId}/images`)
            .pipe(
                map(result => result.map(this.mapStoryBildToBildMetadaten))
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
                        entityId: event.body.storyId,
                        bildKey: event.body.bildKey,
                        imageUrl: `/api/stories/${event.body.storyId}/images/${event.body.bildKey}`
                    }
                };

            case HttpEventType.DownloadProgress:
            case HttpEventType.ResponseHeader:
                return {finished: false, progress: 100, result: null};

            default:
                throw event;
        }
    }

    private mapStoryBildToBildMetadaten(storyBild): BildMetadaten {
        return <BildMetadaten> {
            id: storyBild.id,
            entityId: storyBild.storyId,
            bildKey: storyBild.bildKey,
            imageUrl: `/api/stories/${storyBild.storyId}/images/${storyBild.bildKey}`
        }
    }
}
