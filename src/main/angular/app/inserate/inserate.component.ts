import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Inserat} from "./inserat";
import {Story} from "../stories/story";
import {Insert} from "@angular-devkit/build-optimizer/src/purify/purify";

@Component({
    selector: 'app-inserate',
    templateUrl: './inserate.component.html',
    styleUrls: ['./inserate.component.css']
})
export class InserateComponent {
    inserate: Inserat[];

    constructor(private http: HttpClient) {
        this.http.get("/inserate").pipe(
            map(result => (<any> result)._embedded.inserate),
            tap(r => console.log(r))
        )
            .subscribe(result => this.inserate = result);

    }

    doClick(inserat: Inserat) {
        let index = this.inserate.indexOf(inserat);
        this.inserate.splice(index, 1);
    }
}
