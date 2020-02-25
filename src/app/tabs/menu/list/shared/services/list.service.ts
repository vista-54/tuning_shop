import { APP_URL } from './../../../../../shared/constants/url';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EntityService } from 'src/app/shared/services/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class ListService extends EntityService implements Resolve<any>{

  constructor(public request: RequestService) {
    super(request);
    this.url = APP_URL.category.index;
  }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params['id']);

    return this.get(route.params['id']);
  }
}
