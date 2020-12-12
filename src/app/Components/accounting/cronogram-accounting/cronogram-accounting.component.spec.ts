import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramAccountingComponent } from './cronogram-accounting.component';

describe('CronogramAccountingComponent', () => {
  let component: CronogramAccountingComponent;
  let fixture: ComponentFixture<CronogramAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronogramAccountingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronogramAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
