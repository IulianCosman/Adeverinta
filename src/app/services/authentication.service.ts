import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from "@angular/fire/auth";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  signUp(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout(){
    return from(this.auth.signOut())
  }

}
