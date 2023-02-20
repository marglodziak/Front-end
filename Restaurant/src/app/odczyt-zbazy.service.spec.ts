import { TestBed } from '@angular/core/testing';

import { OdczytZBazyService } from './odczyt-zbazy.service';

describe('OdczytZBazyService', () => {
  let service: OdczytZBazyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdczytZBazyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
