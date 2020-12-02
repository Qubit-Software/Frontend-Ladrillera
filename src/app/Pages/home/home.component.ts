import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rol: any;
  nombre: string = "...";
  constructor(private auth: AuthService) {
    this.rol = localStorage.getItem('rol');
    this.nombre = localStorage.getItem('name');
  }

  ngOnInit(): void {

  }

}
