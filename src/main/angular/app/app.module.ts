import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InserateComponent} from './components/inserate/inserate.component';
import { StoriesComponent } from './components/stories/stories.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { StoriesDetailComponent } from './components/stories-detail/stories-detail.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {InserateService} from "./services/inserate.service";
import {StoriesService} from "./services/stories.service";

@NgModule({
  declarations: [
      AppComponent,
      InserateComponent,
      StoriesComponent,
      StoriesDetailComponent,
      InserateService,
      StoriesService
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      OrderModule,
      Ng2SearchPipeModule,
      FormsModule,
      RouterModule.forRoot(AppRoutes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],

})
export class AppModule {
}
