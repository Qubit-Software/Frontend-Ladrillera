import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/products.model';
import { ClientService } from 'src/app/Services/Client/client.service';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {

  clientName: any;
  fechaCargue:any;
  product: any;
  public pedidos: PedidoModel;
  idOrder: number;
  private sub: any;
  public products = [
    {
      "codigo": "LAD21-MATCO",
      "nombre": ["Bloquelon MATCO"],
      "medida": ["Unidad"]
    },
    {
      "codigo": "LAD21-MALLA",
      "nombre": ["Malla Electrosoldada"],
      "medida": [
        "Rollo/s",
        "Panel/es"
      ]
    },
    {
      "codigo": "LAD21-PERFIL",
      "nombre": ["Perfil Entrepiso"],
      "medida": ["Metro/s"]
    }
  ];

  constructor(private CreateOrderService: CreateOrderService, private route: ActivatedRoute, private clientServ: ClientService) {
    this.idOrder = parseInt(this.route.snapshot.paramMap.get("id").slice(1, 99));
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.pedidos = new PedidoModel();
    this.CreateOrderService.getPedidoId(Number(this.idOrder)).subscribe((result: any[]) => {
      Swal.close();
      this.product = result['productos'];
      this.product=result['productos'];
      this.pedidos.id = result['id'];
      this.pedidos.idCliente = result['id_cliente'];
      this.pedidos.fechaCargue = result['fecha_cargue'];
      this.pedidos.total = result['total'];
      this.pedidos.producto = [['']];
      this.pedidos.status = result['estatus']
      this.pedidos.producto = result['productos'];
      this.pedidos.producto.forEach(p => {
        const produc = this.products.find(prod => prod.codigo === p.codigo_producto);
        p.nombre = produc.nombre;
      });
      this.clientName = result['cliente'].nombre+" "+result['cliente'].apellido;
      this.fechaCargue=result['fecha_cargue'];
      console.log(this.clientName);
    });
  }


}
export class PedidoModel {
  id: number;
  idCliente: number;
  fechaCargue: string;
  status: string;
  total: string;
  producto: any;

}
