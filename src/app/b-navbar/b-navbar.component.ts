import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent implements OnInit {
  appUser : any;

  constructor(private auth: AuthService) {
    auth.appUser$?.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void { }

  logout() {
    this.auth.logout();
  }

}
