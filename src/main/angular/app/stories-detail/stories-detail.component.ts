import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stories-detail',
  templateUrl: './stories-detail.component.html',
  styleUrls: ['./stories-detail.component.css']
})
export class StoriesDetailComponent implements OnInit {

  constructor(
    private location: Location) { }

  ngOnInit() {

  }

     goBack(): void {
    this.location.back();
  }
}
