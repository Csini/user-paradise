import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/app/gen';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
  ],
  providers: [],
  bootstrap: [DetailComponent]
})
export class DetailModule { }
