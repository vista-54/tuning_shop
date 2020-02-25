import { TestBed } from '@angular/core/testing';

import { ColleguesService } from './collegues.service';

describe('ColleguesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColleguesService = TestBed.get(ColleguesService);
    expect(service).toBeTruthy();
  });
});
