import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  store = {
    name: 'Alice Freeman',
    avatar: 'assets/images/avatars/profile.jpg',
    messages: 8,
    notifications: 106,
    likes: 2875,
    newLikes: 23,
    sale: {
      name: 'Smartwatch Xiaomi',
      image: 'assets/images/avatars/profile.jpg',
      price: 699.90,
      likes: 38,
      sales: 8,
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
