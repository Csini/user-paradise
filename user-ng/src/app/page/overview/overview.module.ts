import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/app/gen';
import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
  ],
  providers: [],
  bootstrap: [OverviewComponent]
})
export class OverviewModule { }
