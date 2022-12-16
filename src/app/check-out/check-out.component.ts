import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
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
  cartSubscription : Subscription | undefined;
  userSubscription : Subscription | undefined;
  price: number | undefined;
  items: any;
  userId: string | undefined;

  constructor(private router : Router, private authService : AuthService, private orderService : OrderService, private shoppingCartService : ShoppingCartService) { }
  
  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  async ngOnInit(){
    this.userSubscription = this.authService.user$?.pipe().subscribe(user => this.userId = user.uid)
    
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe((cart : any) => {
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

  async save(){
    let order = {
      datePlaced : new Date().getTime(),
      shipping : this.shipping,
      items : this.cart,
      totalPrice : this.price,
      userId : this.userId,  
    };
    
    let result = await this.orderService.placeOder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
