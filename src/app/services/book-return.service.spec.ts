import { TestBed } from '@angular/core/testing';

import { BookReturnService } from './book-return.service';

describe('BookReturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookReturnService = TestBed.get(BookReturnService);
    expect(service).toBeTruthy();
  });
});
