import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin :  boolean | undefined;
  user$ : Observable<any> | undefined;

  constructor(private userService: UserService, private afAuth : AngularFireAuth, private route : ActivatedRoute) { 
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

  get appUser$(){
    return this.user$?.pipe(switchMap( user => {
      if (user) return this.userService.get(user!.uid).valueChanges();

      return of(null);
    })); 
  }
  
}
