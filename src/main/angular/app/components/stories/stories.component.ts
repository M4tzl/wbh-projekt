import {Component} from '@angular/core';
import {Story} from "../../model/story";
import {StoriesService} from "../../services/stories.service";


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
    stories: Story[];

  constructor(private storiesService: StoriesService) {
      this.storiesService.loadAll()
          .subscribe(result => this.stories = result);
  }

}
