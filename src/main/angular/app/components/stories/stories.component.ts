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
    key: string = 'Beschreibung'; //set default
    reverse: boolean = false;
    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

  constructor(private storiesService: StoriesService) {
      this.storiesService.loadAll()
          .subscribe(result => this.stories = result);
  }

}
