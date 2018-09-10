import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
    MatDialogModule,
    MatInputModule,
    MatPaginatorIntl,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UploadComponent} from "./components/upload/upload.component";
import {SafeUrlPipe} from "./infrastructure/safe-url.pipe";
import {InteressentenStartpageComponent} from './components/interessenten/startpage/interessenten-startpage.component';
import {DatenschutzComponent} from './components/allgemein/datenschutz/datenschutz.component';
import {FaqComponent} from './components/allgemein/faq/faq.component';
import {ImpressumComponent} from './components/allgemein/impressum/impressum.component';
import {MatPaginatorIntlGerman} from './services/paginator.service';
import {InseratSucheComponent} from './components/inserate/suche/inserat-suche.component';
import {InseratKontaktComponent} from './components/inserate/kontakt/inserat-kontakt.component';
import {UserLoginComponent} from './components/login/login/user-login.component';
import {InserateDialogStoryschreiberComponent} from './components/inserate/storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';
import {SecurityService} from "./services/security.service";
import {XhrInterceptor} from "./infrastructure/xhr.interceptor";
import {InteressentenRegisterComponent} from "./components/interessenten/register/interessenten-register.component";
import {VermittlerRegisterComponent} from "./components/vermittler/register/vermittler-register.component";
import {EqualValidator} from "./validation/equal-validator";
import {VermittlerStartpageComponent} from "./components/vermittler/startpage/vermittler-startpage.component";
import {StartpageRoleGuard} from "./guards/startpage-role.guard";
import {AnonymousStartpageComponent} from "./components/anonymous/startpage/anonymous-startpage.component";
import {SessionExpiredComponent} from "./components/allgemein/session/expired/session-expired.component";
import {InitiatePasswordResetComponent} from "./components/login/initiate-reset/initiate-password-reset.component";
import {ResetPasswordComponent} from "./components/login/reset/reset-password.component";


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
        InteressentenStartpageComponent,
        VermittlerStartpageComponent,
        AnonymousStartpageComponent,
        DatenschutzComponent,
        FaqComponent,
        ImpressumComponent,
        InseratSucheComponent,
        InseratKontaktComponent,
        UserLoginComponent,
        InteressentenRegisterComponent,
        VermittlerRegisterComponent,
        InserateDialogStoryschreiberComponent,
        EqualValidator,
        SessionExpiredComponent,
        InitiatePasswordResetComponent,
        ResetPasswordComponent
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
        SecurityService,
        StartpageRoleGuard,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter},
        {provide: NgbDateAdapter, useClass: CustomNgbDateAdapter},
        {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
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
