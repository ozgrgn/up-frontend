import { TestBed } from '@angular/core/testing';

import { RestserviceService } from './rest.service';

describe('RestserviceService', () => {
  let service: RestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
