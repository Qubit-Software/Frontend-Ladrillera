import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {  }

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
  title = 'Ladrillera21';
}
