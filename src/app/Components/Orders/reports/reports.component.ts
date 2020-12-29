import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public isChecked: boolean;
  public pedidos: PedidoModel[];
  constructor(private CreateOrderService: CreateOrderService) { }

  ngOnInit(): void {
    this.getElements(false);
  }
  test() {
    this.getElements(this.isChecked);
  }

  private getElements(finalizados) {
    
    if (finalizados == true) {
      this.pedidos=this.pedidos.filter(element => element.status != "Pedido finalizado");
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();
      this.pedidos = new Array();
      this.CreateOrderService.getPedidos().subscribe((result: any[]) => {
        result.forEach(p => {
          const ped = new PedidoModel();
          ped.id = `LAD21-${p.id}`;
          ped.status = p.estatus;
          ped.total = p.total;
          if (ped !== null) {
            this.pedidos.push(ped);
          }
          Swal.close();
        });
      });
    }
  }
}
export class PedidoModel {
  id: string;
  status: string;
  total: string;
}
