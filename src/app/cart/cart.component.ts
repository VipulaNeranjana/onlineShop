import { Component, OnInit } from '@angular/core';
import { values } from 'lodash';
import { map } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : any;
  cart$ : any;
  shoppingCartItems : any[] | undefined;

  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit(){

    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe((values: any) => {
      this.cart = values;
      console.log(this.cart);
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

}
