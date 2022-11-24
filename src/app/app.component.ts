import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlineShop';

  constructor(private auth : AuthService, router : Router) {
    auth.user$?.subscribe(user => {
      if(user) {
      let returnUrl = localStorage.getItem('returnUrl');
      router.navigateByUrl(returnUrl as string);
      }
    });     //if it is wanted to unsubscrib, it can be done by ondistroy interface
  }
}
