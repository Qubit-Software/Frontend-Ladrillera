import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { EventEmitter } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class WebSocketService {

  public notificationAmount$ = new EventEmitter<any>();
  public notificationData: any[] = [];
  echo: Echo = null
  pusher: Pusher = null

  setupWithToken(token) {
    if (!token) {
      this.echo = null;
      return;
    }
    this.pusher = new Pusher('pusher_app_key', {
      cluster: 'mt1',
    });

    this.echo = new Echo({
      broadcaster: "pusher",
      key: "pusher_app_key",
      cluster: "mt1",
      wsHost: 'api.intranet-ladrillera21.com',
      encrypted: true,
      disableStats: true,
      wssPort: 443,
      enabledTransports: ['ws', 'wss'],
      wsPort: 443
    });
    window['echo'] = this.echo;
    this.listen();
  }
  listen() {
    this.echo.channel('notificaciones')
      .listen('EventoNotificacionGeneral', async (data) => {
        let rol = localStorage.getItem('rol');
        console.log(data);
        if (data['alcance'] == rol || data['alcance'] == 'Todos') {
          this.notificationData.unshift(data);
          let audio = new Audio();
          audio.src = "../../../assets/Sonidos/1.mp3";
          audio.load();
          audio.play();
          this.notificationAmount$.emit();
        }
      })

  }
  constructor() {
  }
}
