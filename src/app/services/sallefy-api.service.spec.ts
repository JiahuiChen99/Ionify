import { TestBed } from '@angular/core/testing';

import { SallefyAPIService } from './sallefy-api.service';

describe('SallefyAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SallefyAPIService = TestBed.get(SallefyAPIService);
    expect(service).toBeTruthy();
  });
});
