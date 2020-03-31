import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {CoreSidebarService} from '@core/components/sidebar/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  constructor(
    private _coreSidebarService: CoreSidebarService
  ) {}

  toggleSidebarOpen(key): void {
    this._coreSidebarService.getSidebar(key).toggleOpen();
  }

}
