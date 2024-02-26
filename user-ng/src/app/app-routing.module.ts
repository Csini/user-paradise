import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './page/overview/overview.component';
import { DetailComponent } from './page/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' }, //default route
  { path: 'overview', component: OverviewComponent },
  { path: 'detail/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
