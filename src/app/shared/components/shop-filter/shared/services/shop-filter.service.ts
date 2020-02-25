import { Injectable } from '@angular/core';
import { APP_URL } from './../../../../../shared/constants/url';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class ShopFilterService {

  constructor(private request: RequestService) { }

  get(id: number) {
    return this.request.get(APP_URL.filter.category + '/' + id + '/providers');
  }
}
