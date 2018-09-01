import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserateComponent }      from './inserate/inserate.component';
import { StoriesComponent }      from './stories/stories.component';
import { StoriesDetailComponent } from './stories-detail/stories-detail.component';


const routes: Routes = [
    { path: '', redirectTo: 'inserate', pathMatch: 'full' },
    { path: 'inserate', component: InserateComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'stories/detail/:id', component: StoriesDetailComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
