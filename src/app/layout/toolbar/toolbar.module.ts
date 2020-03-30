import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ToolbarComponent} from 'app/layout/toolbar/toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RouterModule,

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
