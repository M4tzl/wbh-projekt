import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InserateComponent} from './inserate/inserate.component';
import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [
      AppComponent,
      InserateComponent,
      StoriesComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
