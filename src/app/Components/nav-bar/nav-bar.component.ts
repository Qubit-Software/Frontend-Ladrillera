import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    var size;
    var elemento = document.getElementsByClassName("dropdown-submenu");
    var tokenActive;
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
  }
  logOut(){
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
  tokenActive=this.auth.readToken();;

}
