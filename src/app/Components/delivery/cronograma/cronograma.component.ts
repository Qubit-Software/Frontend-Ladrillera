import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core'; // include this line
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  url = window.location.href.slice(0, -9);
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

  constructor(private orders: CreateOrderService, private router: Router) {
    const name = Calendar.name;
    this.getOrders();
  }

  ngOnInit(): void {

  }
  public render() {
    let calendarApi = this.calendarComponent.getApi();
    this.calendarOptions = {
      plugins: [interactionPlugin],
      dateClick: function (info) {
        calendarApi.gotoDate(info.dateStr);
        calendarApi.changeView('dayGridDay');
      },
      locale:esLocale,
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
            color: 'red',
            url: `${this.url + `photography/` + res[i][h].id}`
          });
        }
      }
      this.render();
      Swal.close();
    });
  }
}
