import {Component, OnInit} from "@angular/core";
import {InserateService} from "../../../services/inserate.service";
import {ActivatedRoute} from "@angular/router";
import {Inserat} from "../../../model/inserat";
import {Location} from '@angular/common';
import {finalize, map, mergeMap, tap} from "rxjs/operators";
import {BildMetadaten} from "../../../model/bild-metadaten";
import {SecurityService} from "../../../services/security.service";
import {CurrentUser} from "../../../model/current-user";

@Component({
    selector: 'app-inserate-detail',
    templateUrl: './inserate-detail.component.html',
    styleUrls: ['./inserate-detail.component.scss']
})
export class InserateDetailComponent implements OnInit {
    inserat: Inserat;
    loading: boolean = true;
    images: BildMetadaten[] = [];
    currentUser: CurrentUser;

    constructor(private inserateService: InserateService,
                private securityService: SecurityService,
                private route: ActivatedRoute) {
        this.securityService.currentUser
            .subscribe(user => this.currentUser = user);
    }


    ngOnInit(): void {
        this.loading = true;
        this.inserat = <Inserat> {};
        const id = this.route.snapshot.params['id'];
        this.inserateService.load(id)
            .pipe(
                tap(result => this.inserat = result),
                map(inserat => inserat.id),
                mergeMap(inseratId => this.inserateService.loadImages(inseratId)),
                finalize(() => this.loading = false)
            )
            .subscribe(result => this.images = result);
    }

    goBack(): void {
        window.history.back();
    }
}
