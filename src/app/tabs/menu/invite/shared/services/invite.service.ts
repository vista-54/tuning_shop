import { APP_URL } from './../../../../../shared/constants/url';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class InviteService {

  constructor(private request: RequestService, private toast: ToastService) { }

  setInvite(data: object) {
    return this.request.post(APP_URL.invite.index, data).pipe(
      tap(res => {
        if (res['status']) {
          this.toast.toast('success', 'Приглошение успешно отправлено');
        } else {
          this.toast.toast('danger', res['error']);
        }
      })
    );
  }
}
