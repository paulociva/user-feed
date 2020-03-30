import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {CoreSidebarModule} from '@core/components/sidebar/sidebar.component';

import { AppComponent } from './app.component';
import {ToolbarModule} from './layout/toolbar/toolbar.module';

const appRoutes: Routes = [
  {
    path        : 'home',
    loadChildren: () => import('./main/feed/feed.module').then(m => m.FeedModule)
  },
  {
    path      : '**',
    redirectTo: 'home'
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,

    CoreSidebarModule,
    ToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
