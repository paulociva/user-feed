import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  user = {
    id: '5725a6802d10e277a0f35724',
    name: 'Seu Nome',
    avatar: 'assets/images/avatars/profile.jpg',
  };

  timeline = {
    posts: [
      {
        user: {
          name: 'Nome do Amigo',
          avatar: 'assets/images/avatars/profile.jpg'
        },
        time: 'Hoje às 9:45',
        type: 'posted',
        like: 12,
        share: 2,
        medias: [{
          type: 'image',
          preview: 'assets/images/cards/card2-big.jpg'
        }],
        comments: [
          {
            user: {
              name: 'Nome do Amigo',
              avatar: 'assets/images/avatars/profile.jpg'
            },
            time: '3 h',
            message: 'Família mais que linda, parabéns!'
          }
        ]
      },
      {
        user: {
          name: 'Nome do Amigo',
          avatar: 'assets/images/avatars/profile.jpg'
        },
        message: 'Esses momentos com que a gente admira não tem preço e eu sou grato a tudo e a todos vocês por fazerem parte da minha ' +
          'vida precisamos repetir eeses momentos, estamos juntos sempre!',
        time: 'ontem às 14:30',
        type: 'shared',
        like: 98,
        share: 6,
        medias: [{
          type: 'image',
          preview: 'assets/images/cards/card2-large.jpg'
        }, {
          type: 'image',
          preview: 'assets/images/cards/card2-large.jpg'
        }, {
          type: 'image',
          preview: 'assets/images/cards/card2-large.jpg'
        }
        ],
        comments: []
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
