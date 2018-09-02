import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { Story } from '../../../model/story';
import { StoriesService } from '../../../services/stories.service';

@Component({
  selector: 'app-stories-delete',
  templateUrl: './stories-delete.component.html',
  styleUrls: ['./stories-delete.component.css']
})
export class StoriesDeleteComponent implements OnInit {
    story:Story;
    constructor(private location: Location, private route:ActivatedRoute, private service:StoriesService) {
    }
    ngOnInit(){
        this.service.delete(this.route.snapshot.params['id']).subscribe(result => this.story = result);
    }
    goBack(): void {
        this.location.back();
    }
}
