import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { NgModuleResolver } from '@angular/compiler';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'https://3a2d90acd31a.ngrok.io/api/administracion';

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Administration methods

  createEmployee(name, lastname, cedula, gender, bornDate, rol, correo, contrasena, fileToUp: File, modulos) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    const fd = new FormData();
    fd.append('nombres', name);
    fd.append('apellidos', lastname);
    fd.append('cedula_ciudadania', cedula);
    fd.append('genero', gender);
    fd.append('fecha_nacimiento', bornDate);
    fd.append('rol', rol);
    fd.append('email', correo);
    fd.append('password', contrasena);
    fd.append('foto', fileToUp);
    fd.append('modulos', modulos);
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
