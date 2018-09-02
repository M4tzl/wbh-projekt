import {Routes} from "@angular/router";
import {InserateUebersichtComponent} from "./components/inserate/uebersicht/inserate-uebersicht.component";
import {StoriesComponent} from "./components/stories/stories.component";
import {StoriesDetailComponent} from "./components/stories-detail/stories-detail.component";
import { StoriesDeleteComponent } from "./components/stories-delete/stories-delete.component";
import { StoriesEditComponent } from "./components/stories-edit/stories-edit.component";

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'inserate', pathMatch: 'full' },
    { path: 'inserate', component: InserateUebersichtComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'stories/detail/:id', component: StoriesDetailComponent },
    { path: 'stories/delete/:id', component: StoriesDeleteComponent },
    { path: 'stories/edit/:id', component: StoriesEditComponent }
];
