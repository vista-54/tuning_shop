import { tap } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { APP_URL } from 'src/app/shared/constants/url';
import { CreateChatClass } from 'src/app/modals/create-chat';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from 'src/app/shared/services/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class ChatsListService extends EntityService implements Resolve<any>{

    private chat;

    constructor(
        private toast: ToastService,
        public request: RequestService,
        public db: AngularFireDatabase
    ) {
        super(request);
        this.url = APP_URL.chat.index;
    }

    resolve() {
        return this.get();
    }

    create(users: object) {
        let usersId = [users['member_1'], users['member_2']];
        return this.request.post(APP_URL.chat.index, users).pipe(
            tap(res => {
                if (res['status']) {
                    usersId.map(userId => {
                        this.chat = new CreateChatClass(this.db);
                        this.chat.checkChat(res['id'], userId, 'create');
                    });
                }
            })
        );
    }

    rmChat(room_id: number, users: object) {
        let usersId = [users['member_1'], users['member_2']];
        return this.request.delete(APP_URL.chat.delete + '/' + room_id).pipe(
            tap(res => {
                if (res['status']) {
                    usersId.map(userId => {
                        this.chat = new CreateChatClass(this.db);
                        this.chat.checkChat(room_id, userId, 'delete');
                    });
                }
            })
        )
    }
}