import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin :  boolean | undefined;
  user$ : Observable<any> | undefined;

  constructor(private afAuth : AngularFireAuth, private route : ActivatedRoute) { 
    this.user$ = afAuth.authState ;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
    this.isLoggedin = true;
  }

  logout(){
    this.afAuth.signOut();
    this.isLoggedin = false;
  }

  isUser(){
    console.log(getAuth());
    return this.isLoggedin;
  }
}
