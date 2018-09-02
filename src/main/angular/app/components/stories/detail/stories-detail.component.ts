import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { Story } from '../../../model/story';
import { StoriesService } from '../../../services/stories.service';


@Component({
    selector: 'app-stories-detail',
    templateUrl: './stories-detail.component.html',
    styleUrls: ['./stories-detail.component.scss']
})
export class StoriesDetailComponent implements OnInit{
    story:Story;
    constructor(private location: Location, private route:ActivatedRoute, private service:StoriesService) {
    }
    ngOnInit(){
        this.service.load(this.route.snapshot.params['id']).subscribe(result => this.story = result);
    }
    goBack(): void {
        this.location.back();
    }
}
