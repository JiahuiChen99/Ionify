import { TestBed } from '@angular/core/testing';

import { CloudinaryApiService } from './cloudinary-api.service';

describe('CloudinaryApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudinaryApiService = TestBed.get(CloudinaryApiService);
    expect(service).toBeTruthy();
  });
});
