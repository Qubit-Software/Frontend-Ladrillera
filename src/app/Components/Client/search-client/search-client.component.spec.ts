import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchClientComponent } from './search-client.component';

describe('SearchClientComponent', () => {
  let component: SearchClientComponent;
  let fixture: ComponentFixture<SearchClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
