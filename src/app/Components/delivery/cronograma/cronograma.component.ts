import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {
  title = 'calendario';
  data: any[] = [
    {
      title: '',
      start: '',
      end: '',
      editable: false
    }
  ];
  calendarOptions: CalendarOptions;

  constructor(private orders: CreateOrderService) {
    this.getOrders();
  }

  ngOnInit(): void {

  }
  private render() {
    this.calendarOptions = {
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'dayGridMonth,dayGridDay'
      },
      //eventos ejemplo
      events: this.data
    }
  }
  private getOrders() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.orders.cronogramItems().subscribe((res) => {
      for (var i in res) {
        for (let h = 0; h < res[i].length; h++) {
          this.data.push({
            title: 'Lad21-' + res[i][h].id,
            start: res[i][h].fecha_cargue,
            end: res[i][h].fecha_cargue,
            editable: false,
            color: 'red'
          });
        }
      }
      this.render();
      Swal.close();
    });
  }
}
