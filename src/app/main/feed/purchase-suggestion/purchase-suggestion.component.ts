import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-suggestion',
  templateUrl: './purchase-suggestion.component.html',
  styleUrls: ['./purchase-suggestion.component.scss']
})
export class PurchaseSuggestionComponent implements OnInit {

  suggestions = [
    {
      name: 'teste',
      image: 'assets/images/cards/card2.jpg',
    },
    {
      name: 'teste',
      image: 'assets/images/cards/card2-small.jpg',
    },
    {
      name: 'teste',
      image: 'assets/images/cards/card2-medium.jpg',
    },
    {
      name: 'teste',
      image: 'assets/images/cards/card2-large.jpg',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
