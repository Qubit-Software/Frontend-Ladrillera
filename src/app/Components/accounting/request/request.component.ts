import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  public clients: any[];
  constructor(private clientServ: ClientService) { }

  ngOnInit(): void {
    this.clients = new Array();
    this.clientServ.getClientRequests(0).subscribe((res: any[]) => {

      this.clients = res;
    });
  }

}
