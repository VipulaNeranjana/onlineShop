import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
//import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import { appUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user : firebase.User) {
    this.db.object('/users/' + user.uid).update({  //to update the and save the logged user
      name : user.displayName,
      email : user.email
    })
  }

  get(uid : string) : AngularFireObject<appUser>{
    return this.db.object('/users/'+ uid);
  }
}
