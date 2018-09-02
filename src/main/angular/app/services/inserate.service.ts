import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Inserat} from "../model/inserat";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class InserateService {
    constructor(private httpClient: HttpClient) {
    }

    public loadAll(): Observable<Inserat[]> {
        return this.httpClient.get<any>("/inserate")
            .pipe(
                map(result => result._embedded.inserate)
            );
    }
}
