import { TestBed } from '@angular/core/testing';

import { PublicationdataService } from './publicationdata.service';

describe('PublicationdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicationdataService = TestBed.get(PublicationdataService);
    expect(service).toBeTruthy();
  });
});
