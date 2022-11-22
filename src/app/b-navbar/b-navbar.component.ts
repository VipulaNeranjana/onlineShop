import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent implements OnInit {

  user : any;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user);
   }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
  }

}
