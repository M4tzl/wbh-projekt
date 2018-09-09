import {BrowserModule} from '@angular/platform-browser';
import {NgModule, forwardRef} from '@angular/core';

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
    MatTableModule,
    MatPaginatorIntl,
    MatDialogModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UploadComponent} from "./components/upload/upload.component";
import {SafeUrlPipe} from "./infrastructure/safe-url.pipe";
import { StartpageComponent } from './components/allgemein/startpage/startpage.component';
import { DatenschutzComponent } from './components/allgemein/datenschutz/datenschutz/datenschutz.component';
import { FaqComponent } from './components/allgemein/faq/faq/faq.component';
import { ImpressumComponent } from './components/allgemein/impressum/impressum/impressum.component';
import { MatPaginatorIntlGerman } from './services/paginator.service';
import { InseratSucheComponent } from './components/inserate/suche/inserat-suche.component';
import { InseratKontaktComponent } from './components/inserate/kontakt/inserat-kontakt.component';
import { UserLoginComponent } from './components/login/user-login.component';
import { InteressentenRegistryComponent } from './components/interessenten/registry/interessenten-registry.component';
import { VermittlerRegistryComponent } from './components/vermittler/registry/vermittler-registry.component';
import { InserateDialogStoryschreiberComponent } from './components/inserate/storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';



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
        StartpageComponent,
        DatenschutzComponent,
        FaqComponent,
        ImpressumComponent,
        InseratSucheComponent,
        InseratKontaktComponent,
        UserLoginComponent,
        InteressentenRegistryComponent,
        VermittlerRegistryComponent,
        InserateDialogStoryschreiberComponent

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
        MatDialogModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        InserateService,
        StoriesService,
        BreedService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter},
        {provide: NgbDateAdapter, useClass: CustomNgbDateAdapter},
        {
            provide: MatPaginatorIntl,
            useClass: forwardRef(() => MatPaginatorIntlGerman)
        }

    ],
    bootstrap: [AppComponent],
    entryComponents: [InserateDialogStoryschreiberComponent]

})
export class AppModule {
}
