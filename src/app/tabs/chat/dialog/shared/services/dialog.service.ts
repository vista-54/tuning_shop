import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { APP_URL } from 'src/app/shared/constants/url';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class DialogService extends EntityService implements Resolve<any> {

    private chat;

    constructor(
        private _toast: ToastService,
        public request: RequestService) {
        super(request);
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let id = route.params['id'];
        return this.startDialog(id);
    }

    sendPushNot(data: object, user_id: number): Observable<any> {
        return this.request.post(APP_URL.chat.push + '/' + user_id, data, false);
    }

    startDialog(id: number): Observable<any> {
        return this.request.post(APP_URL.chat.startDialog + '/' + id, {}, false);
    }

    setFile(id: number, files: object) {
        return this.request.post(APP_URL.chat.files + '/' + id, files);
    }
}