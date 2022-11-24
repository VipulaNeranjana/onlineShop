import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
//import { map } from '@firebase/util';
import { AuthService } from './auth.service';
//import { map } from 'rxjs/operators';

import { map, Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.user$?.pipe(map((user: any) => {
      if (user)
        return true;

      this.router.navigate(['/login']);
      return false;
    })) as unknown as boolean; 
  }



  // canActivate(){
  //   if (this.auth.isUser()){
  //     return true;                    // this is a server side authenticantion
  //   }

  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
