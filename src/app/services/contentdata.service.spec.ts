import { TestBed } from '@angular/core/testing';

import { ContentdataService } from './contentdata.service';

describe('ContentdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentdataService = TestBed.get(ContentdataService);
    expect(service).toBeTruthy();
  });
});
