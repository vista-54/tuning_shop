import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { APP_URL } from './../../../../../shared/constants/url';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class ClaimService {

    constructor(public request: RequestService, public toast: ToastService) { }

    claim(data) {
        return this.request.post(APP_URL.claim.index, data).pipe(
            tap(res => {
                if (res['status']) {
                    this.toast.toast('success', 'Запрос отправлен');
                } else {
                    this.toast.toast('danger', 'Произошла ошибка');
                }
            })
        );
    }
}