import { TestBed } from '@angular/core/testing';

import { DaneDoKoszykaService } from './dane-do-koszyka.service';

describe('DaneDoKoszykaService', () => {
  let service: DaneDoKoszykaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaneDoKoszykaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
