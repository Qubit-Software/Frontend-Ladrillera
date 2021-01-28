import { NgModule } from '@angular/core';
import { StepProgressBarComponent } from './step-progress-bar/step-progress-bar.component';
import { StepItemComponent } from './step-item/step-item.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [StepProgressBarComponent, StepItemComponent],
  imports: [CommonModule
  ],
  exports: [StepProgressBarComponent]
})
export class StepProgressBarModule { }
