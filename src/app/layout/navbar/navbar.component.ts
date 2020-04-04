import {Component, HostBinding, OnInit} from '@angular/core';
import {animate, transition, trigger, state, style} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('0', style({
        height: '0px'
      })),
      state('1', style({
        height: '*'
      })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ])
  ]
})
export class NavbarComponent {
  user = {
    id: '5725a6802d10e277a0f35724',
    name: 'Seu Nome',
    avatar: 'assets/images/avatars/profile.jpg',
  };

  isOpen = false;

  toggleOpen(ev): void {
    ev.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
