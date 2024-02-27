import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/app/gen';
import { DetailComponent } from './detail.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
    RouterModule,
    KeyboardShortcutsModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [DetailComponent]
})
export class DetailModule { }
