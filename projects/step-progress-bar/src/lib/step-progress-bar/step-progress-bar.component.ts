import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StepItem } from '../model/StepItem';

@Component({
  selector: 'redesprou-step-progress-bar',
  templateUrl: './step-progress-bar.component.html',
  styleUrls: ['./step-progress-bar.component.scss']
})
export class StepProgressBarComponent implements OnInit, OnChanges {


  @Input("items") items: Array<StepItem>;
  @Input('steps') steps: number;
  private currentStep= 0;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.steps)
      this.resolveItems(Number(changes.steps.currentValue));
  }

  resolveItems(steps: number) {
    this.items = [];
    for(let i = 0; i < steps; i++) {
      this.items.push({value: i+ 1 +'', status:"pendent", isFirst: false, isLast: false})
    }
  }

  reset() {
    this.items.forEach(item => {
        item.status = "pendent"
    });
    this.currentStep = 0;
  }

  setSuccess(): void {
    this.advance("success");
  }

  setFail(): void {
    this.advance("fail");
  }

  private advance(status: string) {
    if(this.currentStep < this.items.length) {
      this.items[this.currentStep].status = status;
      this.currentStep++;
    }
  }

  getWidth() {
    const width = 100 / this.items.length;
    return width;
  }

}
