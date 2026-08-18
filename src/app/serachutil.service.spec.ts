import { TestBed } from '@angular/core/testing';

import { SerachutilService } from './serachutil.service';

describe('SerachutilService', () => {
  let service: SerachutilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerachutilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
