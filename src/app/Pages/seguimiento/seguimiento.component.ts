import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepItem } from 'projects/step-progress-bar/src/lib/model/StepItem';
import { StepProgressBarComponent } from 'projects/step-progress-bar/src/lib/step-progress-bar/step-progress-bar.component';
import Swal from 'sweetalert2';
import { CreateOrderService } from '../../Services/Orders/createOrder/create-order.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit, AfterViewInit {

  items: Array<StepItem> = [];
  @ViewChild(StepProgressBarComponent, { static: false }) stepProgressBarComponent: StepProgressBarComponent;
  id: number;
  existe = true;
  percent = '10%';
  infoGeneral = new InfoModel();

  constructor(private seguimientoService: CreateOrderService, private router: ActivatedRoute) {
    this.items.push({ value: "Factura generada", status: "pendent", isFirst: true, isLast: false });
    this.items.push({ value: "Pago realizado", status: "pendent", isFirst: false, isLast: false });
    this.items.push({ value: "Despacho sin iniciar", status: "pendent", isFirst: false, isLast: true });
    this.items.push({ value: "Despacho en proceso", status: "pendent", isFirst: false, isLast: true });
    this.items.push({ value: "Despacho finalizado", status: "pendent", isFirst: false, isLast: true });
    this.items.push({ value: "Pedido finalizado", status: "pendent", isFirst: false, isLast: true });


  }
  ngOnInit() {
  }
  config() {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
    });
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.seguimientoService.getSeguimiento(this.id).subscribe(res => {
      Swal.close();
      this.infoGeneral.cliente = `${res['cliente']['nombre']} ${res['cliente']['apellido']}`;
      this.infoGeneral.codigo = `LAD21-${res['id']}`;
      this.infoGeneral.fechaCargue = res['fecha_cargue'];
      this.infoGeneral.total = res['total'];
      this.changeStatus(res['estatus']);

    }, (err) => {
      Swal.close();
      this.existe = false;
    });
  }
  async ngAfterViewInit() {
    this.stepProgressBarComponent.items = this.items;
    await this.config();

  }
  changeStatus(status) {
    if (status === 'Pendiente Pago') {
      this.setSuccess()
    }
    if (status === 'Despacho sin iniciar') {
      this.setSuccess()
      this.setSuccess()
      this.percent = '23%'
    }
    if (status === 'Despacho sin iniciar') {
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.percent = '37%'
    }
    if (status === 'Despacho en proceso') {
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.percent = '53%'
    }
    if (status === 'Despacho finalizado') {
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.percent = '67%'
    }
    if (status === 'Pedido finalizado') {
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.setSuccess()
      this.percent = '80%'
    }

  }
  setSuccess() {
    this.stepProgressBarComponent.setSuccess();
  }

  setFail() {
    this.stepProgressBarComponent.setFail();
  }

  reset() {
    this.stepProgressBarComponent.reset();
  }
}
export class InfoModel {
  cliente: string;
  codigo: string;
  fechaCargue: string;
  total: string;
}
