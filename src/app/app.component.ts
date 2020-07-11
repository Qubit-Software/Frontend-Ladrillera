import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
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
      console.log(window.innerWidth);
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
  title = 'Ladrillera21';
}
