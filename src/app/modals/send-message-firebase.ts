import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as queryString from 'query-string';

export class SendMessageFirebaseClass {

    private unread: object = {};
    private user: object = {};

    subUnred;
    textContent: AngularFireList<any>;
    unreadList: AngularFireObject<any>;

    constructor(public db: AngularFireDatabase) { }

    sendMessage(roomId: number, newRecord: any, userId: number, type: string = 'message') {
        this.textContent = this.db.list('chats/' + roomId + '/messages');
        this.unreadList = this.db.object('chats/' + roomId + '/unread');
        this.subUnred = this.unreadList.snapshotChanges().subscribe(action => {
            action.payload.val() != null ? this.unread = action.payload.val() : {};
            (isNaN(this.unread[userId])) ? this.unread[userId] = 1 : this.unread[userId]++;
            newRecord['type'] = type;
            this.textContent.push(newRecord);
            this.unread['room_id'] = roomId;
            this.unreadList.update(this.unread);
            this.subUnred.unsubsribe();
        });
    }

    readMessage(roomId: number) {
        this.unreadList = this.db.object('chats/' + roomId + '/unread');
        this.subUnred = this.unreadList.snapshotChanges().subscribe(action => {
            action.payload.val() != null ? this.unread = action.payload.val() : {};
            this.user = queryString.parse(localStorage['user']);
            this.unread[this.user['id']] = 0;
            this.unread['room_id'] = roomId;
            this.unreadList.update(this.unread);
            // this.subUnred.unsubsribe();
        });

    }
}