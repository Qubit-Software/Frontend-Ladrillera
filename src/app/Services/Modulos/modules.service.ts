import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
<<<<<<< HEAD
  private url = 'http://02450ae931d8.ngrok.io/api/administracion';
=======
  private url = 'https://4e70b73a919f.ngrok.io/api/administracion';
>>>>>>> 273adf4cd74a7e3b58e103bac78f0246c732c716

  constructor( private http: HttpClient, private auth: AuthService ) { }

  //Gets all the active modules
  getModules(){
    const opts ={
      headers : new HttpHeaders({
        'Authorization': "Bearer "+this.auth.readToken()
      })
    }
      return this.http.get(
      (`${this.url}/modulo`),
      opts
    ).pipe(
      map((resp:any[]) => {
        return resp.map(modulos =>{
          return {id:modulos.id,nombre: modulos.nombre}
        });
      })
    );

  }
  //Gets all the employee active modules
  getModulesEmployee(){
    const opts ={
      headers : new HttpHeaders({
        'Authorization': "Bearer "+this.auth.readToken()
      })
    }
      return this.http.get(
      (`${this.url}/user_modules`),
      opts
    ).pipe(
      map((resp:any[]) => {
        return resp.map(modulos =>{
          return {id:modulos.id,nombre: modulos.nombre}
        });
      })
    );

  }
}
