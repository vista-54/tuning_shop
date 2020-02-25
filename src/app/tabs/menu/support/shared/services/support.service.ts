import { APP_URL } from 'src/app/shared/constants/url';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class SupportService {

  constructor(private request: RequestService, private toast: ToastService) { }

  setSupport(data) {
    return this.request.post(APP_URL.support.index, data).pipe(
      tap(res => {
        if (res['status']) {
          this.toast.toast('success', 'Ваш запрос принят');
        } else {
          this.toast.toast('danger', res['error']);
        }
      })
    );
  }
}
