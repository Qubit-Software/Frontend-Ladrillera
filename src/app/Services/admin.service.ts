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

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Administration methods

  createEmployee(name, lastname, cedula, gender, bornDate, rol, correo, contrasena) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2FkYmQ3ZDE1MTZmNzAzOTEwY2M1YTBhYWI3MmI3YTExZTA2MGZjN2ZlYmUyOWNkZmQ4OWU1ZmQyNGZhMmQyMjk5MDAyNDQ4ZDAwYmVmYmYiLCJpYXQiOjE1OTQ1MjU3ODksIm5iZiI6MTU5NDUyNTc4OSwiZXhwIjoxNjI2MDYxNzg4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Xbo8AW2voKuZRXBfRpZtshK_gQmv48pkQJluDj9vKwx4l5J22UOZWL0RT1UUIz_3cZRKWVF3ayaq5HJbMej4ojjBC77nhtECpfFfbiBQkXqSoqvEAzt9lr4HJQhNKa18pUB78YOIWZFoyjj2524qflx_9QIF5LeEebTu6_z1iCF4LUa3dYvez9-sHBK8XyLIKM_w0sftDmO4k9qbpE9Q_qlTZa2kERS3J8fKbmS_G66nMAwYU5nTGlpJDey1duFZBb7AS3jgn1sXIENUkBk9tHkhxsBW5eOUY7ONDkYNoxzlqu-AjobO5V32X4ZRLaXsaMLvkmx7fRqk3xzjp9-EgS_-74alB_wpkASL8i9_eQLJiSuqOgmfxyHOYAfGh6shQkBh5cCTZ_BkzVxq-ZhPIWeHXvjXMsVTjO7b0ecOmN0XzFg8_K8PvjTVhDjm1VpZ87iSsfEMXYpH6jYOxW3OTyx7-KAJPTHL5E_Fu2B3cCUIfzffaea2JHm9Q-UhZrwm9Q7gAgACgp8VYT-tjAvY6MOLib8koHubW_PjLy5dFTFIW3GpfDfGc51IyWbPPLGUdtVjMYBiPRlD9IZubUiiitxAQ7xmspJjDDN2q4TbSE3UDLuVys0NIHzY0UTwm3EsBKBePoNR7sqLEwzmejkDyMnIfABJE2MGePpsTvhMSUE"
      })
    }
    console.log(opts.headers.get('Authorization'));
    const authData = {
      nombres: name,
      apellidos: lastname,
      cedula_ciudadania: cedula,
      genero: gender,
      fecha_nacimiento: bornDate,
      rol: rol,
      email: correo,
      password: contrasena
    };

    return this.http.post(
      `${this.url}/empleado`,
      authData,
      opts

    );
  }
}
