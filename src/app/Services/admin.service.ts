import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'http://127.0.0.1:8000/api/administracion';

  constructor( private http: HttpClient ) { }

    //Administration methods

    createEmployee( usuario: UsuarioModel, name, lastname, cedula, gender, bornDate, rol){

      const authData = {
        nombres: name,
        apellidos: lastname,
        cedula_ciudadania:cedula,
        genero: gender,
        fecha_nacimiento: bornDate,
        rol: rol,
        ...usuario
      };
  
      return this.http.post(
        `${this.url}/empleado`,
        authData
      );
    }
}
