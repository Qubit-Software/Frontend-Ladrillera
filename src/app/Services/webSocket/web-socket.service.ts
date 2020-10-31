import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class WebSocketService {
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
      wsHost: window.location.hostname,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      wsPort: 6001
    });
    window['echo'] = this.echo;
    this.listen();
  }
  listen() {
    this.echo.channel('notificaciones')
      .listen('EventoNotificacionGeneral', (data) => {
        this.notificationData.unshift(data);

        let audio = new Audio();
        audio.src = "../../../assets/Sonidos/1.mp3";
        audio.load();
        audio.play();
      })

  }
  constructor() { }
}
