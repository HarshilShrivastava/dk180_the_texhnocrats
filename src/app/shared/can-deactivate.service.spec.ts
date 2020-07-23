import { TestBed } from '@angular/core/testing';

import { CanDeactivateService } from './can-deactivate.service';

describe('CanDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateService = TestBed.get(CanDeactivateService);
    expect(service).toBeTruthy();
  });
});
