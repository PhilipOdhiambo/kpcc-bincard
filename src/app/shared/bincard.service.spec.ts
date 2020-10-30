import { TestBed } from '@angular/core/testing';

import { BincardService } from './bincard.service';

describe('BincardService', () => {
  let service: BincardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BincardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
