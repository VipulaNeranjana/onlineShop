import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent implements OnInit {
  appUser : any;
  shoppingCartItemCount : any ;

  constructor(private auth: AuthService,private shoppingCartService : ShoppingCartService) {
    auth.appUser$?.subscribe(appUser => this.appUser = appUser);
  
  }

  async ngOnInit(){
    let cart$ =await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
    this.shoppingCartItemCount = 0;
    for (let productTitle of Object.keys(cart!.items)){
      console.log(productTitle)
      this.shoppingCartItemCount += cart!.items[productTitle as keyof typeof cart].quantity;
      //console.log(cart!.items[productTitle as keyof typeof cart].quantity)
    }
    })
  }

  logout() {
    this.auth.logout();
  }

}
