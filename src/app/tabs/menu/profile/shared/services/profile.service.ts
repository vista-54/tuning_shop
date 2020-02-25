import { tap } from 'rxjs/operators';
import { APP_URL } from './../../../../../shared/constants/url';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as queryString from 'query-string';

@Injectable()
export class ProfileService implements Resolve<any>{

  constructor(private request: RequestService, private toastService: ToastService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = queryString.parse(localStorage['user'])['id'];
    return this.getUser(id);
  }

  getUser(id) {
    return this.request.get(APP_URL.user.index + '/' + id);
  }

  updateUser(data: object) {
    return this.request.put(APP_URL.user.index + '/' + data['id'], data).pipe(
      tap(res => {
        if (res['status']) {
          this.toastService.toast('success', 'Пользователь успешно обновлен');
        }
      })
    );
  }
}
