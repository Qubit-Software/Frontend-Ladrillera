import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  public clients: any[];
  constructor(private clientServ: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clients = new Array();
    this.clientServ.getClientRequests(0).subscribe((res: any[]) => {

      this.clients = res;
      console.log(res);
    });
  }

  change(id) {
    const cli=this.clients.find(prod => prod.id === id);
    console.log(cli);
    this.clientServ.updateRequest(cli).subscribe(res => {
      this.router.navigate(['/accounting/create']);
    }, (err) => {
      console.log(err);
    });
  }
}
