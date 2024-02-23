import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './page/overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' }, //default route
  { path: 'overview', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
