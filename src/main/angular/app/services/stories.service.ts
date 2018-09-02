import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Story} from "../model/story";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class StoriesService {
    constructor(private httpClient: HttpClient){
    }

    public loadAll(sort?: string, sortDirection?: string): Observable<Story[]> {
        let url = "/stories";
        if(sort){
            url += "?sort=" + sort;
            if(sortDirection){
                url += ","+sortDirection;
            }
        }

        return this.httpClient.get<any>(url)
            .pipe(
                map(result => result._embedded.stories)
            );
    }
    public load(id:number): Observable<Story> {
        return this.httpClient.get<Story>("/stories/"+id);
    }
    public delete(id:number): Observable<Story> {
        return this.httpClient.delete<Story>("/stories/"+id);
    }
    public update(story: Story): Observable<Story> {
        return this.httpClient.put<Story>(`/stories/${story.id}`, story);
    }
}
