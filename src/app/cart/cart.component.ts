import { Component, OnDestroy, OnInit } from '@angular/core';
import { values } from 'lodash';
import { map, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart : any;
  cart$ : any;
  shoppingCartItems : any[] | undefined;
  price : number | undefined;
  subscription : Subscription | undefined;

  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit(){

    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.cart$.valueChanges().subscribe((values: any) => {
      this.cart = values;
      console.log(this.cart);

      if (values) {
        this.price =0;
        for (let productTitle of Object.keys(values!.items)){
      
          const quantity = parseFloat(values!.items[productTitle as keyof typeof values].quantity);
          const priceForOne = parseFloat(values!.items[productTitle as keyof typeof values].product.price);
          this.price! += quantity *priceForOne;
        }
      }
    })
    // (await this.shoppingCartService.getCart()).valueChanges().pipe(map(values => 
    //   values?.items.map(c => {
    //     const product = c.product as Product;
    //     const quantity = c.quantity;
    //     console.log(product);
    //     return {quantity , ...product}
    //   })
    // )).subscribe(data => {
    //   this.shoppingCartItems = data!;
    //   console.log(data);
    // })
    
  }

  addToCart(product: any){
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: any){
    this.shoppingCartService.removeFromCart(product);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}
