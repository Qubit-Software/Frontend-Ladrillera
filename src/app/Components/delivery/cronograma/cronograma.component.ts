import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {
  title = 'calendario';

  calendarOptions: CalendarOptions = {
    //cabezera
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,dayGridDay'
    },
    footerToolbar: {
      center: "agregarevento"
    },
    //eventos ejemplo
    events: [
      {
        title: 'entrega urgente',
        start: '2020-11-01',
        end: '2020-11-01',
        editable: true
      },
      {
        title: 'recorrido ',
        start: '2020-11-21',
        end: '2020-11-21',
        slotDuration: '02:00'
      },
      {
        title: 'entregas',
        start: '2020-11-21',
        end: '2020-11-21',
        slotDuration: '02:00',
        color: 'green'
      },
      {
        title: 'llegada empleados',
        start: '2020-11-21 13:00:00',
        end: '2020-11-21 14:00:00',
        //slotDuration: '02:00',
        color: 'green'
      }
    ],
    //boton de agregar
    customButtons: {
      agregarevento: {
        text: 'add event',
        click: function () {
          alert();
        }
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
