import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class BreedService {
    constructor(private httpClient: HttpClient){

    }

    public loadAll(): Observable<string[]>{
        return this.httpClient.get<any>("https://dog.ceo/api/breeds/list/all")
            .pipe(
                map(result => result.message),
                map(this.flattenBreeds),
                map(result => result.sort())
            );
    }

    private flattenBreeds(msg) {
        const keys = Object.keys(msg);
        let result = [];
        keys.forEach(k => {
            const subBreeds: string[] = msg[k];
            if (subBreeds.length === 0) {
                result.push(k);
            } else {
                subBreeds.forEach(sub => result.push(sub + " " + k));
            }
        });


        return result;
    }
}
