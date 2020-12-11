import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private url = 'https://cd8d0cd57a8b.ngrok.io/api/administracion';

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
