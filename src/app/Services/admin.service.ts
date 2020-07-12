import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'http://127.0.0.1:8000/api/administracion';

  constructor( private http: HttpClient, private auth: AuthService ) { }

    //Administration methods

    createEmployee( name, lastname, cedula, gender, bornDate, rol,correo,contrasena){
      const opts ={
        headers : new HttpHeaders({
          'Authorization': "bearer "+this.auth.readToken(),
        })
      }
      console.log(opts.headers.get('Authorization'));
      const authData = {
        nombres: name,
        apellidos: lastname,
        cedula_ciudadania:cedula,
        genero: gender,
        fecha_nacimiento: bornDate,
        rol: rol,
        email:correo,
        password:contrasena
      };
  
      return this.http.post(
        `${this.url}/empleado`,
        authData,
        opts
        
      );
    }
}
