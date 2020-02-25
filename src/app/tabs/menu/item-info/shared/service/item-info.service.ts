import { RequestService } from 'src/app/shared/services/request.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APP_URL } from 'src/app/shared/constants/url';

@Injectable()
export class ItemInfoService implements Resolve<any>{

  constructor(private request: RequestService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.get(route.params['id']);
  }

  get(id: number) {
    return this.request.get(APP_URL.product.index + '/' + id);
  }
}
