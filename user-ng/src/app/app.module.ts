import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewModule } from './page/overview/overview.module';
import { DetailModule } from './page/detail/detail.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverviewModule,
    DetailModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
