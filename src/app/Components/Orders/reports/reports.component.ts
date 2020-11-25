import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public pedidos: PedidoModel[];
  constructor(private CreateOrderService: CreateOrderService) { }

  ngOnInit(): void {
    this.pedidos = new Array();
    this.CreateOrderService.getPedidos().subscribe((result: any[]) => {
      result.forEach(p => {
        const ped = new PedidoModel();
        ped.id = p.id;
        ped.status = p.estatus;
        ped.total = p.total;
        console.log(ped);
        if (ped !== null) {
          this.pedidos.push(ped);
        }
      });
    });
  }

}
export class PedidoModel {
  id: number;
  status: string;
  total: string;
}
