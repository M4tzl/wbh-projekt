import {Component} from '@angular/core';
import {StoriesService} from "../../../services/stories.service";

@Component({
    selector: 'app-interessenten-startpage',
    templateUrl: './interessenten-startpage.component.html',
    styleUrls: ['./interessenten-startpage.component.css']
})
export class InteressentenStartpageComponent {
    showOpenStories: boolean;

    constructor(private storiesService: StoriesService) {
        this.storiesService.loadOpen(0, 1)
            .subscribe(result => this.showOpenStories = result.stories.length > 0);
    }

    get cardClasses(): string {
        return this.showOpenStories ? 'col-sm-6 col-md-6 mb-2' : 'col-sm-12 col-md-12 mb-4';
    }
}
