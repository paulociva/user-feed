import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ToolbarComponent} from 'app/layout/toolbar/toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
