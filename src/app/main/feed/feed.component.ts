import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {

  user = {
    id: '5725a6802d10e277a0f35724',
    name: 'Seu Nome',
    avatar: 'assets/images/avatars/profile.jpg',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
