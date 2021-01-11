import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private url = `${environment.apiUrl}/notificaciones`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Administration methods

  sendNotification(titulo,body,router,alcance,prioridad) {
    const authData = {
      titulo,
      body,
      router,
      alcance,
      prioridad
    };
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.post(`${this.url}`,
      authData, opts);
  }
}
