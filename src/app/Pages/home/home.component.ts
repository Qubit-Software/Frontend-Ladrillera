import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var size;
    var elemento = document.getElementsByClassName("dropdown-submenu");

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

}
