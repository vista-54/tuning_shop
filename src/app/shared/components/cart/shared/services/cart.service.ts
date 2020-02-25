import { APP_URL } from 'src/app/shared/constants/url';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class CartService {

  constructor(private request: RequestService) { }

  buy(data: object) {
    return this.request.post(APP_URL.cart.buy, data);
  }
}
