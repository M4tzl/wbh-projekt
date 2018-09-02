import {Component} from '@angular/core';
import {Story} from "../../model/story";
import {StoriesService} from "../../services/stories.service";
import {ColumnSortedEvent} from "../../lib/sortable-table/sort.service";


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
    stories: Story[];
    onSorted(evt: ColumnSortedEvent){
        this.loadStories(evt);
    }
  constructor(private storiesService: StoriesService) {
    this.loadStories();
  }
  private loadStories(sortEvent?: ColumnSortedEvent) {
    const sortColumn = (sortEvent || ({} as ColumnSortedEvent)).sortColumn;
    const sortDirection = (sortEvent || ({} as ColumnSortedEvent)).sortDirection;
    this.storiesService.loadAll(sortColumn, sortDirection)
        .subscribe(result => this.stories = result);
}
}
