import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {CoreSidebarModule} from '@core/components/sidebar/sidebar.component';

import { AppComponent } from './app.component';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FeedComponent } from './main/feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,

    CoreSidebarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
