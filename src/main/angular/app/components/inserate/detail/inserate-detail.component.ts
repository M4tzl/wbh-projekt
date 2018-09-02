import {Component, OnInit} from "@angular/core";
import {InserateService} from "../../../services/inserate.service";
import {ActivatedRoute} from "@angular/router";
import {Inserat} from "../../../model/inserat";
import {Location} from '@angular/common';

@Component({
    selector: 'app-inserate-detail',
    templateUrl: './inserate-detail.component.html',
    styleUrls: ['./inserate-detail.component.scss']
})
export class InserateDetailComponent implements OnInit {
    inserat: Inserat;

    constructor(private inserateService: InserateService,
                private location: Location,
                private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.inserateService.load(id)
            .subscribe(result => this.inserat = result);
    }

    goBack(): void {
        this.location.back();
    }
}
