import { TestBed } from '@angular/core/testing';

import { ShopFilterService } from './shop-filter.service';

describe('ShopFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopFilterService = TestBed.get(ShopFilterService);
    expect(service).toBeTruthy();
  });
});
