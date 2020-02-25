import { APP_URL } from 'src/app/shared/constants/url';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Resolve } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import * as queryString from 'query-string';

@Injectable()
export class NewsService extends EntityService implements Resolve<any>{

  private user: object;

  constructor(public request: RequestService) {
    super(request)
    this.url = APP_URL.news.index;
  }

  resolve() {
    this.user = queryString.parse(localStorage['user']);
    return this.get(this.user['id']);
  }

}
