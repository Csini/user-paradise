import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DeletebuttonComponent } from './deletebutton/deletebutton.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ApiModule } from '../gen';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DeletebuttonComponent,
  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule,
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [
    DeletebuttonComponent,
  ],
  exports: [
    DeletebuttonComponent,
  ]
})
export class ParadiseCommonModule { }
