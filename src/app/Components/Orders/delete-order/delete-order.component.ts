import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {
  title = 'angular-sweetalert-demo';
  id: number;
  form: FormGroup;
  parent: string;
  rol: string;

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
      Swal.fire({
        title: "Encontrado",
        text: "La orden buscada existe,Por favor ingrese la calve administrativa para eliminar el pedido",
        icon: "success",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "red",
        cancelButtonText: "Cancelar",
      }).then(resultado => {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Espere por favor'
        });
        Swal.showLoading();
        if (resultado.value) {
          if (resultado.value == '234567LAD' || resultado.value == '234653LAD1') {
            this.CreateOrderService.deleteOrderById(this.id).subscribe((res) => {
              Swal.close();
              Swal.fire({
                title: "Eliminado",
                text: "La orden ha sido eliminada",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Salir",
                confirmButtonColor: "green",
              })
            });
          } else {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'El pedido buscado no se pudo eliminar',
              text: 'Revisa tus datos antes de realizar esta acción'
            });
          }
        }
      });
      console.log(resp);
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'La orden no fue encontrada',
        text: 'Revisa tus datos antes de acceder'
      });
      console.log(err);
    });
  }
  test() {

  }

}
