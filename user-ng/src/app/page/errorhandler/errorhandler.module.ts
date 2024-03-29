import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/app/gen';

import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { RouterModule } from '@angular/router';
import { ErrorhandlerComponent } from './errorhandler.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ErrorhandlerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ApiModule,
    RouterModule,
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [ErrorhandlerComponent]
})
export class ErrorhandlerModule { }
