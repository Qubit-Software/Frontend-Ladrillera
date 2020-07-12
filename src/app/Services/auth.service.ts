import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api/auth'

  userToken: string;
  expiresAt: string;
  
  constructor(private http: HttpClient) { 
    this.readToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      remember_me: true
    };

    return this.http.post(
      `${this.url}/login`,
      authData
    ).pipe(
      map( resp =>{
        this.saveToken(resp['access_token'],resp['expires_at']);
        return resp;
      })
    );

  }

  register(usuario: UsuarioModel, nombre, contraseña) {

    const authData = {
      name: nombre,
      ...usuario,
      password_confirmation: contraseña
    };

    return this.http.post(
      `${this.url}/signup`,
      authData
    ).pipe(
      map( resp =>{
        this.saveToken(resp['access_token'],resp['expires_at']);
        return resp;
      })
    );

  }

  private saveToken(idToken: string, expiresAt: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let today=new Date(expiresAt);
   
    localStorage.setItem("expires",today.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
      return this.userToken;
    } else {
      this.userToken = '';
      return false;
    }

    
  }

  authenticated(): boolean{
    if (this.userToken.length<2) {
      return false;
    }

    const expires =Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    if (expiresDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
}
