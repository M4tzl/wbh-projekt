import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Story} from "../model/story";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {StoriesResult} from "../model/stories-result";
import {BildMetadaten} from "../model/bild-metadaten";
import {UploadService} from "./upload.service";
import {MatPaginatorIntl} from "@angular/material";

@Injectable()
export class StoriesService implements UploadService {
    constructor(private httpClient: HttpClient){
    }

    public loadAll(titelFilter: string,
                   sort: string, sortDirection: string,
                   page: number, pageSize: number): Observable<StoriesResult> {
        return this.httpClient.get<any>(`/api/stories/search/byTitel?titel=${titelFilter}&sort=${sort},${sortDirection}&page=${page}&size=${pageSize}`)
            .pipe(
                map(result => <StoriesResult> {
                    stories: result._embedded.stories,
                    page: result.page
                })
            );
    }

    public load(id:number): Observable<Story> {
        return this.httpClient.get<Story>("/api/stories/"+id);
    }
    public delete(id:number): Observable<Story> {
        return this.httpClient.delete<Story>("/api/stories/"+id);
    }
    public update(story: Story): Observable<Story> {
        return this.httpClient.put<Story>(`/api/stories/${story.id}`, story);
    }
    public uploadImage(storyBild: BildMetadaten, file: File): Observable<BildMetadaten> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        if(storyBild.id){
            return this.httpClient
                .put<BildMetadaten>(`/api/stories/${storyBild.entityId}/images/${storyBild.id}`, formData)
                .pipe(
                    map(this.mapStoryBildToBildMetadaten)
                );
        }

        return this.httpClient
            .post<BildMetadaten>(`/api/stories/${storyBild.entityId}/images`, formData)
            .pipe(
                map(this.mapStoryBildToBildMetadaten)
            );
    }
    public loadImages(storyId: number): Observable<BildMetadaten[]> {
        return this.httpClient.get<BildMetadaten[]>(`/api/stories/${storyId}/images`)
            .pipe(
                map(result => result.map(this.mapStoryBildToBildMetadaten))
            );
    }

    private mapStoryBildToBildMetadaten(storyBild) : BildMetadaten{
        return <BildMetadaten> {
            id: storyBild.id,
            entityId: storyBild.storyId,
            bildKey: storyBild.bildKey,
            imageUrl: `/api/stories/${storyBild.storyId}/images/${storyBild.bildKey}`
        }
    }
}
