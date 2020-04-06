import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { StoreComponent } from './store/store.component';
import { PurchaseSuggestionComponent } from './purchase-suggestion/purchase-suggestion.component';
import {RouterModule, Routes} from '@angular/router';
import {FeedComponent} from './feed.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


const routes: Routes = [
  {
    path     : '',
    component: FeedComponent,
  },
  {
    path      : '**',
    redirectTo: ''
  }
];
@NgModule({
  declarations: [
    FeedComponent,
    PurchaseSuggestionComponent,
    TimelineComponent,
    StoreComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonToggleModule,
  ]
})
export class FeedModule { }
