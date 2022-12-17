import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any;
  subscription : Subscription;

  constructor(private orderService: OrderService) {
    this.subscription =  orderService.getOrders().valueChanges().subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
    
  }

  ngOnInit(): void {
  }

}
