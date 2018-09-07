import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {InserateUebersichtComponent} from './components/inserate/uebersicht/inserate-uebersicht.component';
import {StoriesComponent} from './components/stories/uebersicht/stories.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StoriesDetailComponent} from './components/stories/detail/stories-detail.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {InserateService} from "./services/inserate.service";
import {StoriesService} from "./services/stories.service";
import {StoriesEditComponent} from './components/stories/edit/stories-edit.component';
import {StoriesDeleteComponent} from './components/stories/delete/stories-delete.component';
import {InserateDetailComponent} from "./components/inserate/detail/inserate-detail.component";
import {InserateEditComponent} from "./components/inserate/edit/inserate-edit.component";
import {BreedService} from "./services/breed.service";
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomNgbDateParserFormatter} from "./infrastructure/custom-ngb-date-parser-formatter";
import {CustomNgbDateAdapter} from "./infrastructure/custom-ngb-date-adapter";
import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UploadComponent} from "./components/upload/upload.component";
import {SafeUrlPipe} from "./infrastructure/safe-url.pipe";
import { StartpageComponent } from './components/startpage/startpage.component';

@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        InserateUebersichtComponent,
        InserateDetailComponent,
        InserateEditComponent,
        StoriesComponent,
        StoriesDetailComponent,
        StoriesEditComponent,
        StoriesDeleteComponent,
        SafeUrlPipe,
        StartpageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        InserateService,
        StoriesService,
        BreedService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter},
        {provide: NgbDateAdapter, useClass: CustomNgbDateAdapter}
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
