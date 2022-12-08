import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db : AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }

  private getCart(cartId : string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId : string, productTitle : string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productTitle);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  async addToCart(product : Product | any){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.title);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    item$.update({ product: product, quantity : (item?.payload?.exportVal()?.quantity | 0) + 1 });
    })
  }
}
