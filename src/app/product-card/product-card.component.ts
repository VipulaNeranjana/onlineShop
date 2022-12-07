import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product : Product | any;
  @Input('show-actions') showActions = true;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(product : Product | any){
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
  }

}
