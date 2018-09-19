import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InserateVerwaltenComponent} from './components/inserate/verwalten/inserate-verwalten.component';
import {StoriesComponent} from './components/stories/uebersicht/stories.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StoriesDetailComponent} from './components/stories/detail/stories-detail.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {InserateService} from "./services/inserate.service";
import {StoriesService} from "./services/stories.service";
import {StoriesEditComponent} from './components/stories/edit/stories-edit.component';
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
import {StartpageComponent} from './components/startpage/startpage.component';
import {DatenschutzComponent} from './components/allgemein/datenschutz/datenschutz.component';
import {FaqComponent} from './components/allgemein/faq/faq.component';
import {ImpressumComponent} from './components/allgemein/impressum/impressum.component';
import {MatPaginatorIntlGerman} from './services/paginator.service';
import {InseratSuchMaskeComponent} from './components/inserate/such-maske/inserat-such-maske.component';
import {InseratKontaktComponent} from './components/inserate/kontakt/inserat-kontakt.component';
import {UserLoginComponent} from './components/login/login/user-login.component';
import {InserateDialogStoryschreiberComponent} from './components/inserate/storyschreiber/inserate-dialog-storyschreiber/inserate-dialog-storyschreiber.component';
import {SecurityService} from "./services/security.service";
import {XhrInterceptor} from "./infrastructure/xhr.interceptor";
import {InteressentenRegisterComponent} from "./components/register/interessent/interessenten-register.component";
import {VermittlerRegisterComponent} from "./components/register/vermittler/vermittler-register.component";
import {EqualValidator} from "./validation/equal-validator";
import {SessionExpiredComponent} from "./components/allgemein/session/expired/session-expired.component";
import {InitiatePasswordResetComponent} from "./components/login/initiate-reset/initiate-password-reset.component";
import {ResetPasswordComponent} from "./components/login/reset/reset-password.component";
import {YesNoDialogComponent} from "./components/allgemein/yes-no-dialog/yes-no-dialog.component";
import {OpenStoriesComponent} from "./components/stories/open/open-stories.component";
import {InserateSucheComponent} from "./components/inserate/suche/inserate-suche.component";
import {PastValidator} from "./validation/past-validator";
import {KontaktformularService} from "./services/kontaktformular.service";
import {AdminService} from "./services/admin.service";
import {AccountUebersichtComponent} from "./components/admin/account-uebersicht/account-uebersicht.component";
import {NotAllowedComponent} from "./components/allgemein/not-allowed/not-allowed.component";
import {UpdateUserGuard} from "./guards/update-user.guard";
import {AdminAccountDetailsGuard} from "./guards/admin-account-details.guard";


@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        InserateVerwaltenComponent,
        InserateDetailComponent,
        InserateEditComponent,
        StoriesComponent,
        StoriesDetailComponent,
        StoriesEditComponent,
        SafeUrlPipe,
        StartpageComponent,
        DatenschutzComponent,
        FaqComponent,
        ImpressumComponent,
        InseratSuchMaskeComponent,
        InserateSucheComponent,
        InseratKontaktComponent,
        UserLoginComponent,
        InteressentenRegisterComponent,
        VermittlerRegisterComponent,
        InserateDialogStoryschreiberComponent,
        EqualValidator,
        PastValidator,
        SessionExpiredComponent,
        InitiatePasswordResetComponent,
        ResetPasswordComponent,
        YesNoDialogComponent,
        OpenStoriesComponent,
        AccountUebersichtComponent,
        NotAllowedComponent
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
        KontaktformularService,
        AdminService,
        UpdateUserGuard,
        AdminAccountDetailsGuard,
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
    entryComponents: [InserateDialogStoryschreiberComponent, YesNoDialogComponent]

})
export class AppModule {
}
