import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InserateComponent} from './inserate/inserate.component';
import { StoriesComponent } from './stories/stories.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { StoriesDetailComponent } from './stories-detail/stories-detail.component';

@NgModule({
  declarations: [
      AppComponent,
      InserateComponent,
      StoriesComponent,
      StoriesDetailComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      OrderModule,
      Ng2SearchPipeModule,
      FormsModule
  ],
  exports: [AppRoutingModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],

})
export class AppModule {
}
