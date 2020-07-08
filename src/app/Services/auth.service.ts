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
  
  constructor(private http: HttpClient) { 
    this.readToken();
  }

  logout() {

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
        this.saveToken(resp['access_token']);
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
        this.saveToken(resp['access_token']);
        return resp;
      })
    );

  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
