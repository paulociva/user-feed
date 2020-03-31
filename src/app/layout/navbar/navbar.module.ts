import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';

import {NavbarComponent} from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
