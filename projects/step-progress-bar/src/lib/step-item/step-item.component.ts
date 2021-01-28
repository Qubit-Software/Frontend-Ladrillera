import { Component, OnInit, Input } from '@angular/core';
import { StepItem } from '../model/StepItem';

@Component({
  selector: 'redesprou-step-item',
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.scss']
})
export class StepItemComponent implements OnInit {

  @Input("item") item: StepItem;
  @Input("width") width: StepItem;

  constructor() { }

  ngOnInit() {
  }

}
