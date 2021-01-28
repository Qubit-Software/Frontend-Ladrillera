<div align="center">
  <h1>Step Progress Bar</h1>
  <br>
   A very simple step progress bar for angular
  <br>
  <br>
</div>


## Features

- Step success style
- Step fail style
- Steps reseting

## Dependencies
Angular 6 or higher


## Install

```bash
npm i step-progress-bar
```

## Setup

**Add to NgModule:** add StepProgressBarModule to desired NgModule,

```typescript
import { CommonModule } from '@angular/common';

import {StepProgressBarModule} from 'step-progress-bar'

@NgModule({
  imports: [
    CommonModule,
    StepProgressBarModule // StepProgressBarModule added
  ],
  bootstrap: [App],
  declarations: [App]
})
class MainModule {}
```

## Use

Add **redesprou-step-progress-bar** in desired hmtl page, providing the desired number of steps
```html
...
<div>
    <redesprou-step-progress-bar steps="5"></redesprou-step-progress-bar>
</div>
...

```

Create a ViewChild for  **StepProgressBarComponent** and call is methods as needed

```typescript
import { StepProgressBarComponent } from 'step-progress-bar/lib/step-progress-bar/step-progress-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  @ViewChild(StepProgressBarComponent, {static: false}) stepProgressBarComponent: StepProgressBarComponent;

  success() {
    this.stepProgressBarComponent.setSuccess();
  }

  fail() {
    this.stepProgressBarComponent.setFail();
  }

  reset() {
    this.stepProgressBarComponent.reset();
  }
}
```

## Options


| Option            | Description                              |
| ----------------- | ---------------------------------------- |
| step              | The number of steps in this progress bar |



## Functions
```
setSuccess():void
```
Advances one step, setting current step as "SUCESS"
Do nothing if last step is alredy set
##
```
setFail():void
```
Advances one step, setting current step as "FAIL"
Do nothing if last step is alredy set
##
```
reset():void
```
Resets to the first step, setting all steps as "PENDENT"
##

## License

MIT

---

> GitHub [@erivanbarbosa](https://github.com/erivanbarbosa) &nbsp;&middot;&nbsp;
