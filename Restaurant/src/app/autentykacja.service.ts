import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentykacjaService {

  private autho: Auth;

  constructor(private auth:Auth) { 
    this.autho = auth;
  }

  login(login: string, haslo: string){
    return from(signInWithEmailAndPassword(this.autho, login, haslo));
  }

}
