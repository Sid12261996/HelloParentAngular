import { TestBed } from '@angular/core/testing';

import { BookTransactionService } from './book-transaction.service';

describe('BookTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTransactionService = TestBed.get(BookTransactionService);
    expect(service).toBeTruthy();
  });
});
