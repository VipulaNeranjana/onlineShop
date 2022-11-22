import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent implements OnInit {

  user$ : Observable<any> | undefined;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState ;
   }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
  }

}
