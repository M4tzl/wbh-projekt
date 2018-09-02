import {Component} from '@angular/core';
import {Inserat} from "../../model/inserat";
import {InserateService} from "../../services/inserate.service";


@Component({
    selector: 'app-inserate',
    templateUrl: './inserate.component.html',
    styleUrls: ['./inserate.component.scss']
})
export class InserateComponent {
    inserate: Inserat[];
    key: string = 'Titel'; //set default
    reverse: boolean = false;
    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(private inserateService: InserateService) {
        this.inserateService.loadAll()
            .subscribe(result => this.inserate = result);
    }
}
