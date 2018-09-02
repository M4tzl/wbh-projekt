import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InserateUebersichtComponent} from './components/inserate/uebersicht/inserate-uebersicht.component';
import {StoriesComponent} from './components/stories/stories.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import {StoriesDetailComponent} from './components/stories-detail/stories-detail.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {InserateService} from "./services/inserate.service";
import {StoriesService} from "./services/stories.service";
import {OrderModule} from "ngx-order-pipe";
import {StoriesEditComponent} from './components/stories-edit/stories-edit.component';
import {StoriesDeleteComponent} from './components/stories-delete/stories-delete.component';
import {SortableTableModule} from "./lib/sortable-table/sortable-table.module";
import {InserateDetailComponent} from "./components/inserate/detail/inserate-detail.component";
import {InserateEditComponent} from "./components/inserate/edit/inserate-edit.component";
import {BreedService} from "./services/breed.service";

@NgModule({
    declarations: [
        AppComponent,
        InserateUebersichtComponent,
        InserateDetailComponent,
        InserateEditComponent,
        StoriesComponent,
        StoriesDetailComponent,
        StoriesEditComponent,
        StoriesDeleteComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        OrderModule,
        Ng2SearchPipeModule,
        FormsModule,
        SortableTableModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        InserateService,
        StoriesService,
        BreedService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
