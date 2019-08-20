import { TestBed } from '@angular/core/testing';

import { BnService } from './bn.service';

describe('BnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BnService = TestBed.get(BnService);
    expect(service).toBeTruthy();
  });
});
