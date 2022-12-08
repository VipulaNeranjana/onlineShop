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
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(product : Product | any){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.title];
    return item ? item.quantity : 0;
  }

  ngOnInit(): void {
  }

}
