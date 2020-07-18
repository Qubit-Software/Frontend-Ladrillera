import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { NgModuleResolver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'http://127.0.0.1:8000/api/administracion';

  constructor( private http: HttpClient, private auth: AuthService ) { }

    //Administration methods

    createEmployee( name, lastname, cedula, gender, bornDate, rol,correo,contrasena, fileToUp: File,modulos){
      const opts ={
        headers : new HttpHeaders({
          'Authorization': "Bearer "+this.auth.readToken(),
        })
      }
      const fd = new FormData();
      fd.append('nombres',name);
      fd.append('apellidos',lastname);
      fd.append('cedula_ciudadania',cedula);
      fd.append('genero',gender);
      fd.append('fecha_nacimiento',bornDate);
      fd.append('rol',rol);
      fd.append('email',correo);
      fd.append('password',contrasena);
      fd.append('foto',fileToUp);
      fd.append('modulos',modulos);
      fd.forEach(element => {
        console.log(element);
      });
//

      return this.http.post(
        `${this.url}/empleado`,
        fd,
        opts
        
      ).pipe(
        map(resp => {
         console.log(resp);
        })
      );
    }
}
