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


}
