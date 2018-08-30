import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Story} from "./story";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
    stories: Observable<Story[]>;

  constructor(private httpClient: HttpClient) {
      this.stories = this.httpClient.get<Story[]>("/stories");
      this.stories.subscribe();
  }

  ngOnInit() {
  }

}
