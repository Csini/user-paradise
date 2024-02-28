import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './page/overview/overview.component';
import { DetailComponent } from './page/detail/detail.component';
import { ErrorhandlerComponent } from './page/errorhandler/errorhandler.component';
import { ErrorResolver } from './common/error.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' }, //default route
  { path: 'overview', component: OverviewComponent },
  { path: 'detail/:id', component: DetailComponent },
  {
    path: 'error',
    component: ErrorhandlerComponent,
    resolve: {
      errorData: ErrorResolver,
    },
  },
  {
    path: '**',
    component: ErrorhandlerComponent,
    resolve: {
      errorData: ErrorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
