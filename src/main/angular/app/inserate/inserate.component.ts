import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Inserat} from "./inserat";

@Component({
    selector: 'app-inserate',
    templateUrl: './inserate.component.html',
    styleUrls: ['./inserate.component.css']
})
export class InserateComponent {
    inserate: Observable<Inserat[]>;

    constructor(private http: HttpClient) {
        this.inserate = this.http.get("/inserate").pipe(
            map(result => (<any> result)._embedded.inserate),
            tap(r => console.log(r))
        );

        this.inserate.subscribe();

    }
}
