import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/products.model';
import { ClientService } from 'src/app/Services/Client/client.service';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-charge-order',
  templateUrl: './charge-order.component.html',
  styleUrls: ['./charge-order.component.css']
})
export class ChargeOrderComponent implements OnInit {

  totalSell = 0;
  public pedidos: PedidoModel;
  id: number;
  private sub: any;
  nombreCliente: string;
  status: number;
  rol: string;
  nameBtn: string;
  btnDisable = false;
  atras = false;
  confirm = false;
  continuar = true;
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

  constructor(private CreateOrderService: CreateOrderService, private route: ActivatedRoute, public clientServ: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
    this.getConfigbtn();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    this.pedidos = new PedidoModel();
    this.CreateOrderService.getPedidoId(this.id).subscribe((result: any[]) => {
      this.clientServ.getClientByid(result['id_cliente']).subscribe(res => {
        const name = `${res['nombre']} ${res['apellido']}`;
        this.nombreCliente = name;
      });
      this.pedidos.id = result['id'];
      this.pedidos.idCliente = result['id_cliente'];
      this.pedidos.fechaCargue = result['fecha_cargue'];
      this.pedidos.total = result['total'];
      this.pedidos.producto = new Array();
      this.pedidos.status = result['estatus'];
      this.pedidos.producto = result['productos'];
      this.disableBtn();
      this.pedidos.producto.forEach(p => {
        const produc = this.products.find(prod => prod.codigo === p.codigo_producto);
        p.nombre = produc.nombre;
      });
      console.log(this.pedidos.producto);
    });
  }

  getConfigbtn() {
    if (this.rol === 'Facturacion' || this.rol === 'Administrador') {
      this.nameBtn = 'Factura Generada';
    }
    if (this.rol === 'Finanzas' || this.rol === 'Administrador') {
      this.nameBtn = 'Legalizar pago';
    }
    if (this.rol === 'Porteria' || this.rol === 'Administrador') {
      this.nameBtn = 'Finalizar pedido';
    }
  }
  disableBtn() {
    if ((this.rol === 'Finanzas' || this.rol === 'Administrador') && this.pedidos.status === 'Pendiente Pago') {
      this.btnDisable = true;
      this.status = 2;
    }
    if ((this.rol === 'Facturacion' || this.rol === 'Administrador') && this.pedidos.status === 'Factura no generada') {
      this.btnDisable = true;
      this.status = 4;
    }
    if ((this.rol === 'Porteria' || this.rol === 'Administrador') && this.pedidos.status === 'Factura no generada') {
      this.btnDisable = true;
      this.status = 5;
    }
  }
  Atras(): void {
    this.continuar = true;
    this.confirm = false;
    this.atras = false;
  }
  change() {
    this.continuar = false;
    this.confirm = true;
    this.atras = true;
  }
  confirmar() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.CreateOrderService.changeStatus(this.pedidos.id, this.status).subscribe((result) => {
      console.log(result);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar accion',
      });
      console.log(err);
    });
  }
}
export class PedidoModel {
  id: number;
  idCliente: number;
  fechaCargue: string;
  status: string;
  total: string;
  producto: product[];
}
