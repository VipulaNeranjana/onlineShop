import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  @Input('quantity') quantity : any;
  @Input('cart') cart! : any;
  @Input('price') price! : any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.quantity);
  }

}
