import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: any;
  authSubscription : Subscription | undefined;
  orderSubscription : Subscription | undefined;
  uid!: string;

  constructor(private authService: AuthService, private orderService: OrderService) {
    // this.authSubscription = authService.user$?.subscribe(user =>{ 
    //   this.uid = user.uid;
    //   console.log(user.uid)
    // });
    // this.orderSubscription = orderService.getOrdersByUser(this.uid).valueChanges().subscribe(orders =>{ 
    //   this.orders = orders;
    //   console.log(orders,this.uid)
    // });

    this.authSubscription = authService.user$?.pipe(switchMap(async (u) => orderService.getOrdersByUser(u.uid))).subscribe(cart$ => {

      this.orderSubscription = cart$?.valueChanges().subscribe((orders: any) => this.orders = orders);
    });


   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.authSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

}
