import {Routes} from "@angular/router";
import {InserateVerwaltenComponent} from "./components/inserate/verwalten/inserate-verwalten.component";
import {StoriesComponent} from "./components/stories/uebersicht/stories.component";
import {StoriesDetailComponent} from "./components/stories/detail/stories-detail.component";
import {InserateDetailComponent} from "./components/inserate/detail/inserate-detail.component";
import {InserateEditComponent} from "./components/inserate/edit/inserate-edit.component";
import {StoriesEditComponent} from "./components/stories/edit/stories-edit.component";
import {StartpageComponent} from "./components/startpage/startpage.component";
import {FaqComponent} from "./components/allgemein/faq/faq.component";
import {ImpressumComponent} from "./components/allgemein/impressum/impressum.component";
import {DatenschutzComponent} from "./components/allgemein/datenschutz/datenschutz.component";
import {InseratKontaktComponent} from "./components/inserate/kontakt/inserat-kontakt.component";
import {UserLoginComponent} from "./components/login/login/user-login.component";
import {InteressentenRegisterComponent} from "./components/register/interessent/interessenten-register.component";
import {VermittlerRegisterComponent} from "./components/register/vermittler/vermittler-register.component";
import {SessionExpiredComponent} from "./components/allgemein/session/expired/session-expired.component";
import {InitiatePasswordResetComponent} from "./components/login/initiate-reset/initiate-password-reset.component";
import {ResetPasswordComponent} from "./components/login/reset/reset-password.component";
import {OpenStoriesComponent} from "./components/stories/open/open-stories.component";
import {InserateSucheComponent} from "./components/inserate/suche/inserate-suche.component";
import {InseratSuchMaskeComponent} from "./components/inserate/such-maske/inserat-such-maske.component";
import {UpdateUserGuard} from "./guards/update-user-guard.service";
import {AccountUebersichtComponent} from "./components/admin/account-uebersicht/account-uebersicht.component";


export const AppRoutes: Routes = [
    {path: '', component: StartpageComponent, canActivate: [UpdateUserGuard]},
    {path: 'session-expired', component: SessionExpiredComponent, canActivate: [UpdateUserGuard]},
    {path: 'initiate-pw-reset', component: InitiatePasswordResetComponent, canActivate: [UpdateUserGuard]},
    {path: 'reset-password', component: ResetPasswordComponent, canActivate: [UpdateUserGuard]},
    {path: 'login', component: UserLoginComponent, canActivate: [UpdateUserGuard]},
    {path: 'interessent/register', component: InteressentenRegisterComponent, canActivate: [UpdateUserGuard]},
    {path: 'interessent/update-data', component: InteressentenRegisterComponent, canActivate: [UpdateUserGuard]},
    {path: 'vermittler/register', component: VermittlerRegisterComponent, canActivate: [UpdateUserGuard]},
    {path: 'vermittler/update-data', component: VermittlerRegisterComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/manage', component: InserateVerwaltenComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/detail/:id', component: InserateDetailComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/kontakt/:id', component: InseratKontaktComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/edit/:id', component: InserateEditComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/create', component: InserateEditComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/suche', component: InserateSucheComponent, canActivate: [UpdateUserGuard]},
    {path: 'inserate/such-maske', component: InseratSuchMaskeComponent, canActivate: [UpdateUserGuard]},
    {path: 'stories', component: StoriesComponent, canActivate: [UpdateUserGuard]},
    {path: 'open-stories', component: OpenStoriesComponent, canActivate: [UpdateUserGuard]},
    {path: 'stories/detail/:id', component: StoriesDetailComponent, canActivate: [UpdateUserGuard]},
    {path: 'stories/edit/:id', component: StoriesEditComponent, canActivate: [UpdateUserGuard]},
    {path: 'faq', component: FaqComponent, canActivate: [UpdateUserGuard]},
    {path: 'impressum', component: ImpressumComponent, canActivate: [UpdateUserGuard]},
    {path: 'datenschutz', component: DatenschutzComponent, canActivate: [UpdateUserGuard]},
    {path: 'admin/accounts', component: AccountUebersichtComponent, canActivate: [UpdateUserGuard]},

];
