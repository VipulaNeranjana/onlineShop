import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping : any = {};
  cart : ShoppingCart | undefined;
  subscription : Subscription | undefined;
  price: number | undefined;
  items: any;

  constructor(private orderService : OrderService, private shoppingCartService : ShoppingCartService) { }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe((cart : any) => {
      this.cart = cart!;

      if (cart) {
        this.price =0;
        for (let productTitle of Object.keys(cart!.items)){
      
          const quantity = parseFloat(cart!.items[productTitle as keyof typeof cart].quantity);
          const priceForOne = parseFloat(cart!.items[productTitle as keyof typeof cart].product.price);
          this.price! += quantity *priceForOne;
        }
      }
    });
  }

  save(){
    let order = {
      datePlaced : new Date().getTime(),
      shipping : this.shipping,
      items : this.cart,
      totalPrice : this.price,
      
    };
    
    this.orderService.storeOder(order);
  }

}
