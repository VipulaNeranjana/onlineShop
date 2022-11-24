import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin :  boolean | undefined;
  user$ : Observable<any> | undefined;

  constructor(private afAuth : AngularFireAuth) { 
    this.user$ = afAuth.authState ;
  }

  login(){
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
