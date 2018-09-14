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
import {InteressentenRegisterComponent} from "./components/interessenten/register/interessenten-register.component";
import {VermittlerRegisterComponent} from "./components/vermittler/register/vermittler-register.component";
import {SessionExpiredComponent} from "./components/allgemein/session/expired/session-expired.component";
import {InitiatePasswordResetComponent} from "./components/login/initiate-reset/initiate-password-reset.component";
import {ResetPasswordComponent} from "./components/login/reset/reset-password.component";
import {OpenStoriesComponent} from "./components/stories/open/open-stories.component";
import {InserateSucheComponent} from "./components/inserate/suche/inserate-suche.component";
import {InseratSuchMaskeComponent} from "./components/inserate/such-maske/inserat-such-maske.component";


export const AppRoutes: Routes = [
    {path: '', component: StartpageComponent},
    {path: 'session-expired', component: SessionExpiredComponent},
    {path: 'initiate-pw-reset', component: InitiatePasswordResetComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'login', component: UserLoginComponent},
    {path: 'interessent/register', component: InteressentenRegisterComponent},
    {path: 'vermittler/register', component: VermittlerRegisterComponent},
    {path: 'inserate/manage', component: InserateVerwaltenComponent},
    {path: 'inserate/detail/:id', component: InserateDetailComponent},
    {path: 'inserate/kontakt/:id', component: InseratKontaktComponent},
    {path: 'inserate/edit/:id', component: InserateEditComponent},
    {path: 'inserate/create', component: InserateEditComponent},
    {path: 'inserate/suche', component: InserateSucheComponent},
    {path: 'inserate/such-maske', component: InseratSuchMaskeComponent},
    {path: 'stories', component: StoriesComponent},
    {path: 'open-stories', component: OpenStoriesComponent},
    {path: 'stories/detail/:id', component: StoriesDetailComponent},
    {path: 'stories/edit/:id', component: StoriesEditComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'impressum', component: ImpressumComponent},
    {path: 'datenschutz', component: DatenschutzComponent}

];
