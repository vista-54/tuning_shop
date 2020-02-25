import { concat } from 'rxjs';
import { Injectable } from '@angular/core';
import { toArray, tap } from 'rxjs/operators';
import { APP_URL } from 'src/app/shared/constants/url';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class UserService extends EntityService implements Resolve<any>{

  constructor(public request: RequestService, private toast: ToastService) {
    super(request);
    this.url = APP_URL.news.index;
  }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.params['id'];
    const user = this.getUser(id);
    const news = this.get(id);

    return new Promise(resolve => {
      concat(user, news)
        .pipe(toArray())
        .subscribe(x => {
          resolve(x);
        });
    });
  }

  getUser(id: number) {
    return this.request.get(APP_URL.user.index + '/' + id);
  }

  subs(userId: number) {
    return this.request.post(APP_URL.user.subscribe + '/' + userId, {}).pipe(
      tap(res => {
        if (res['status']) {
          this.toast.toast('success', 'Вы успешно подписаны');
        }
      })
    );
  }

  unsub(userId: number) {
    return this.request.delete(APP_URL.user.subscribe + '/' + userId).pipe(
      tap(res => {
        if (res['status']) {
          this.toast.toast('success', 'Вы успешно отписались');
        }
      })
    );
  }

  logout() {
    return this.request.get(APP_URL.user.logout);
  }
}
