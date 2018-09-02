import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Story} from "../model/story";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class StoriesService {
    constructor(private httpClient: HttpClient){
    }

    public loadAll(): Observable<Story[]> {
        return this.httpClient.get<any>("/stories")
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

}
