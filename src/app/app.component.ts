import {Component} from '@angular/core';

import {CoreSidebarService} from '../@core/components/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _coreSidebarService: CoreSidebarService
  ) {
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebar(name).toggleOpen();
  }
}
