import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { Story } from '../../../model/story';
import { StoriesService } from '../../../services/stories.service';
import {ImageUploadResult} from "../../upload/image-upload-result";
import {BildMetadaten} from "../../../model/bild-metadaten";
import {map, mergeMap, tap} from "rxjs/operators";


@Component({
  selector: 'app-stories-edit',
  templateUrl: './stories-edit.component.html',
  styleUrls: ['./stories-edit.component.css']
})
export class StoriesEditComponent implements OnInit {
    story: Story = <Story>{};
    images: BildMetadaten[] = [];

    constructor(public storyService: StoriesService,
                private route: ActivatedRoute,
                private router: Router) {
    }
    private placeholderStoryBild(story) {
        return <BildMetadaten> {entityId: story.id};
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.storyService.load(id)
                .pipe(
                    tap(result => this.story = result),
                    map(story => story.id),
                    mergeMap(storyId => this.storyService.loadImages(storyId))
                )
                .subscribe(result => {
                    this.images = result;
                    this.images.push(this.placeholderStoryBild(this.story));
                });
        }
    }

    onSubmit(){
        const id = this.route.snapshot.params['id'];
        this.storyService.update(this.story)
            .subscribe(result => this.router.navigate(['/stories/edit/'+id]));
    }
    goBack(): void {
        this.router.navigate(['/stories/']);
    }
    onImageUploaded(event: ImageUploadResult) {
        if (!event.oldImage.id) {
            this.images.push(this.placeholderStoryBild(this.story));
        }
    }
}
