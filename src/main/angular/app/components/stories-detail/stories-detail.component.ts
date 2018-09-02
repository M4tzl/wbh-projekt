import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-stories-detail',
    templateUrl: './stories-detail.component.html',
    styleUrls: ['./stories-detail.component.css']
})
export class StoriesDetailComponent {

    constructor(private location: Location) {
    }

    goBack(): void {
        this.location.back();
    }
}
