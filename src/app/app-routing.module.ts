import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './modules/general/about/about.component';

import { HomeComponent } from './modules/general/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./modules/general/about/about.module')
  //     .then(mod => mod.AboutModule)
  // },
  { path: '**', component: HomeComponent },
  { path: 'about', component: AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
