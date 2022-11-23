import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
