import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { WebSocketService } from 'src/app/Services/webSocket/web-socket.service';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  apiToken: any = localStorage.getItem('token');;

  constructor(private auth: AuthService, public router: Router, public webSocket: WebSocketService) { }

 
  public notificationData = this.webSocket.notificationData;
  public notificationState: boolean = false;

  ngOnInit() {
    this.webSocket.setupWithToken(this.apiToken);
    //DIRECTION NAVBAR
    var size;
    var elemento = document.getElementsByClassName("dropdown-submenu");
    size = window.innerWidth;
    if (size <= 990) {
      for (let i = 0; i < elemento.length; i++) {
        elemento[i].className = "dropdown-submenu dropright"
      }
    } else {
      for (let i = 0; i < elemento.length; i++) {
        elemento[i].className = "dropdown-submenu dropleft"
      }
    }
    function reportWindowSize() {
      size = window.innerWidth;
      if (size <= 990) {
        for (let i = 0; i < elemento.length; i++) {
          elemento[i].className = "dropdown-submenu dropright"
        }
      } else {
        for (let i = 0; i < elemento.length; i++) {
          elemento[i].className = "dropdown-submenu dropleft"
        }
      }
    }
    window.onresize = reportWindowSize;

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

      dropdown.css({
        right: containerWidth / 2 + "px"
      });

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
