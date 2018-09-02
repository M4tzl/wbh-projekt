import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { Story } from '../../model/story';
import { StoriesService } from '../../services/stories.service';


@Component({
  selector: 'app-stories-edit',
  templateUrl: './stories-edit.component.html',
  styleUrls: ['./stories-edit.component.css']
})
export class StoriesEditComponent implements OnInit {
    story: Story = <Story>{};

    constructor(private storyService: StoriesService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location) {
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.storyService.load(id)
            .subscribe(result => this.story = result);
    }

    onSubmit(){
        const id = this.route.snapshot.params['id'];
        this.storyService.update(this.story)
            .subscribe(result => this.router.navigate(['/stories/edit/'+id]));
    }
    goBack(): void {
        this.router.navigate(['/stories/']);
    }
}
