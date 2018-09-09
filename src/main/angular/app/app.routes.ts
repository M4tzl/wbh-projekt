import {Routes} from "@angular/router";
import {InserateUebersichtComponent} from "./components/inserate/uebersicht/inserate-uebersicht.component";
import {StoriesComponent} from "./components/stories/uebersicht/stories.component";
import {StoriesDetailComponent} from "./components/stories/detail/stories-detail.component";
import {StoriesDeleteComponent} from "./components/stories/delete/stories-delete.component";
import {InserateDetailComponent} from "./components/inserate/detail/inserate-detail.component";
import {InserateEditComponent} from "./components/inserate/edit/inserate-edit.component";
import {StoriesEditComponent} from "./components/stories/edit/stories-edit.component";
import {StartpageComponent} from "./components/interessenten/startpage/startpage.component";
import {FaqComponent} from "./components/allgemein/faq/faq.component";
import {ImpressumComponent} from "./components/allgemein/impressum/impressum.component";
import {DatenschutzComponent} from "./components/allgemein/datenschutz/datenschutz.component";
import {InseratKontaktComponent} from "./components/inserate/kontakt/inserat-kontakt.component";
import {UserLoginComponent} from "./components/login/user-login.component";
import {InteressentenRegisterComponent} from "./components/interessenten/register/interessenten-register.component";
import {VermittlerRegisterComponent} from "./components/vermittler/register/vermittler-register.component";


export const AppRoutes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'interessent/register', component: InteressentenRegisterComponent },
    { path: 'vermittler/register', component: VermittlerRegisterComponent },
    { path: 'inserate', component: InserateUebersichtComponent },
    { path: 'inserate/detail/:id', component: InserateDetailComponent },
    { path: 'inserate/kontakt/:id', component: InseratKontaktComponent },
    { path: 'inserate/edit/:id', component: InserateEditComponent },
    { path: 'inserate/create', component: InserateEditComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'stories/detail/:id', component: StoriesDetailComponent },
    { path: 'stories/delete/:id', component: StoriesDeleteComponent },
    { path: 'stories/edit/:id', component: StoriesEditComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'datenschutz', component: DatenschutzComponent }

];
