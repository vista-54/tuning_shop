import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Resolve } from '@angular/router';
import { APP_URL } from 'src/app/shared/constants/url';
import { toArray } from 'rxjs/operators';
import { concat } from 'rxjs';

@Injectable()
export class NotificationService extends EntityService implements Resolve<any>{

  constructor(public request: RequestService) {
    super(request);
    this.url = APP_URL.notification.index;
  }

  resolve() {
    const get = this.get();
    const checkAll = this.all();
    return new Promise((resolve) => {
      concat(get, checkAll)
        .pipe(toArray())
        .subscribe(x => {
          resolve(x);
        });
    });
  }

  all() {
    return this.request.get(APP_URL.notification.all);
  }

  count() {
    return this.request.get(APP_URL.notification.count);
  }
}
