import { TestBed } from '@angular/core/testing';

import { StepProgressBarService } from './step-progress-bar.service';

describe('StepProgressBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepProgressBarService = TestBed.get(StepProgressBarService);
    expect(service).toBeTruthy();
  });
});
