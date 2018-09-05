import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { Story } from '../../../model/story';
import { StoriesService } from '../../../services/stories.service';
import {finalize, map, mergeMap, tap} from "rxjs/operators";
import {BildMetadaten} from "../../../model/bild-metadaten";


@Component({
    selector: 'app-stories-detail',
    templateUrl: './stories-detail.component.html',
    styleUrls: ['./stories-detail.component.scss']
})
export class StoriesDetailComponent implements OnInit{
    story:Story;
    loading: boolean = true;
    images: BildMetadaten[] = [];
    constructor(private location: Location, private route:ActivatedRoute, private storyService:StoriesService) {
    }
    ngOnInit(){
        this.loading = true;
        this.story = <Story> {};
        const id = this.route.snapshot.params['id'];
        this.storyService.load(id)
            .pipe(
                tap(result => this.story = result),
                map(story => story.id),
                mergeMap(storyId => this.storyService.loadImages(storyId)),
                finalize(() => this.loading = false)
            )
            .subscribe(result => this.images = result);
    }
    goBack(): void {
        this.location.back();
    }
}
