import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Story} from '../../../model/story';
import {StoriesService} from '../../../services/stories.service';
import {ImageUploadResult} from "../../upload/image-upload-result";
import {BildMetadaten} from "../../../model/bild-metadaten";
import {map, mergeMap, switchMap, tap} from "rxjs/operators";
import {update} from "../../../infrastructure/immutable-update";


@Component({
    selector: 'app-stories-edit',
    templateUrl: './stories-edit.component.html',
    styleUrls: ['./stories-edit.component.css']
})
export class StoriesEditComponent implements OnInit {
    story: Story = <Story>{};
    images: BildMetadaten[] = [];

    constructor(public storyService: StoriesService,
                private router: Router,
                private route: ActivatedRoute) {
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

    onSubmit(form) {
        if (form.valid) {
            this.storyService.update(update(this.story, {draft: false}))
                .pipe(
                    switchMap(story => this.storyService.loadOpen(0, 1))
                )
                .subscribe(result => result.page.totalElements > 0
                    ? window.history.back()
                    : this.router.navigateByUrl("/stories"));
        }
    }

    goBack(): void {
        window.history.back();
    }

    onImageUploaded(event: ImageUploadResult) {
        if (!event.oldImage.id) {
            this.images.push(this.placeholderStoryBild(this.story));
        }
    }
}
