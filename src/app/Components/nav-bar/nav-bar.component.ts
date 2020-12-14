import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { WebSocketService } from 'src/app/Services/webSocket/web-socket.service';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public notificationAmount = 0;
  apiToken: any = localStorage.getItem('token');;
  public notificationData = this.webSocket.notificationData;
  public notificationState: boolean = false;
  fotoUrl : string;

  constructor(private auth: AuthService, public router: Router, public webSocket: WebSocketService) { }

  ngOnInit() {
    if(localStorage.getItem('foto')=='null'){
      this.fotoUrl='../../../assets/Iconos/people.svg';
    }else{
      this.fotoUrl=localStorage.getItem('foto');
    }
    // observable amount of notifications
    this.webSocket.notificationAmount$.subscribe(
      () => {
        this.notificationAmount += 1;
        console.log(this.notificationAmount);
        console.log(this.webSocket.notificationData);
      }
    );

    // Open the connection between web socket and web app
    this.webSocket.setupWithToken(this.apiToken);



    //Notify starts

    //Open dropdown when clicking on element
    $(document).on("click", "a[data-dropdown='notificationMenu']", function (e) {
      e.preventDefault();

      var el = $(e.currentTarget);

      $("body").prepend(
        '<div id="dropdownOverlay" style="background: transparent; height:100%;width:100%;position:fixed;"></div>'
      );

      var container = $(e.currentTarget).parent();
      var dropdown = container.find(".dropdown");
      var containerWidth = container.width();
      var containerHeight = container.height();

      var anchorOffset = $(e.currentTarget).offset();



      container.toggleClass("expanded");
    });


    //******************************************************************************** */



  }


  //LOGOUT
  logOut() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

}
