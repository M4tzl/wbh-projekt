import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Kontaktformular} from "../model/kontaktformular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class KontaktformularService {
    constructor(private http: HttpClient) {
    }

    send(kontaktformular: Kontaktformular): Observable<any> {
        return this.http.post('/api/kontaktformular', kontaktformular);
    }
}
