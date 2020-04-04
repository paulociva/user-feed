import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {CoreSidebarService} from '@core/components/sidebar/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  user = {
    id: '5725a6802d10e277a0f35724',
    name: 'Seu Nome',
    avatar: 'assets/images/avatars/profile.jpg',
  };
  constructor(
    private _coreSidebarService: CoreSidebarService
  ) {}

  toggleSidebarOpen(key): void {
    this._coreSidebarService.getSidebar(key).toggleOpen();
  }

}
