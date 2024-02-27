import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/app/gen';
import { OverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ParadiseCommonModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
    RouterModule,
    KeyboardShortcutsModule.forRoot(),
    ParadiseCommonModule,
  ],
  providers: [],
  bootstrap: [OverviewComponent]
})
export class OverviewModule { }
