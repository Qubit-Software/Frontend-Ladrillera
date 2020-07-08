import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='http://127.0.0.1:8000/api/auth'


  constructor( private http: HttpClient) { }

  logout(){

  }

  login( usuario: UsuarioModel){

    const authData={
      ...usuario,
      remember_me:true
    };

    return this.http.post(
      `${this.url}/login`,
      authData
    )

  }

  register( usuario: UsuarioModel){

  }
}
