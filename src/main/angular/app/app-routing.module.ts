import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserateComponent }      from './inserate/inserate.component';
import { StoriesComponent }      from './stories/stories.component';

const routes: Routes = [
    { path: '', redirectTo: 'inserate', pathMatch: 'full' },
    { path: 'inserate', component: InserateComponent },
    { path: 'stories', component: StoriesComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
