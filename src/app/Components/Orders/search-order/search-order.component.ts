import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {
  title = 'angular-sweetalert-demo';
  id: number;
  form: FormGroup;
  parent: string;
  rol:string;

  constructor(private CreateOrderService: CreateOrderService, private router: Router) { }

  ngOnInit(): void {
    const route = this.router.url.split('/');
    this.parent = route[1];
    this.rol = localStorage.getItem('rol');

  }

  prueba() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.CreateOrderService.getPedidoId(this.id).subscribe(resp => {
      Swal.close();
      if(this.rol==='Despacho'){
        this.router.navigate([`${this.parent}/photography`, this.id]);
      }else{
        this.router.navigate([`${this.parent}/charge`, this.id]);
      }
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar',
        text: 'Revisa los datos que estas buscando'
      });
      console.log(err);
    });
  }
  test() {

  }

}
