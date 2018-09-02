import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Story} from "../model/story";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {StoriesResult} from "../model/stories-result";

@Injectable()
export class StoriesService {
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
}
