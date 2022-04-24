import { TestBed } from '@angular/core/testing';

import { PreauthService } from './preauth.service';

describe('PreathService', () => {
  let service: PreauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
