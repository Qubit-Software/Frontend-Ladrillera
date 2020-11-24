import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateNewReleaseComponent } from './create-new-release.component';

describe('CreateNewReleaseComponent', () => {
  let component: CreateNewReleaseComponent;
  let fixture: ComponentFixture<CreateNewReleaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
