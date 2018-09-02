import {Routes} from "@angular/router";
import {InserateComponent} from "./components/inserate/inserate.component";
import {StoriesComponent} from "./components/stories/stories.component";
import {StoriesDetailComponent} from "./components/stories-detail/stories-detail.component";
import { StoriesDeleteComponent } from "./components/stories-delete/stories-delete.component";

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'inserate', pathMatch: 'full' },
    { path: 'inserate', component: InserateComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'stories/detail/:id', component: StoriesDetailComponent },
    { path: 'stories/delete/:id', component: StoriesDeleteComponent }
];
