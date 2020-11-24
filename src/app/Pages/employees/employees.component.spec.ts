import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEmployeesComponent } from './employees.component';

describe('CreateEmployeesComponent', () => {
  let component: CreateEmployeesComponent;
  let fixture: ComponentFixture<CreateEmployeesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
