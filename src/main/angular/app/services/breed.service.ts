import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class BreedService {
    constructor(private httpClient: HttpClient){

    }

    public loadAll(): Observable<string[]>{
        return this.httpClient.get<any>("/api/breeds")
            .pipe(
                map(result => result.sort())
            );
    }
}
