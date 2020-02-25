import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { DataUnreadCountService } from '../shared/providers/data-unread';

export class UnreadMessageClass {

    public unread: object = {};

    private subUnred;
    unreadList: AngularFireObject<any>;

    constructor(public db: AngularFireDatabase,
        private returnUnread: DataUnreadCountService) { }

    getUnread(roomId: number, userId: number) {
        this.unreadList = this.db.object('chats/' + roomId + '/unread');
        this.subUnred = this.unreadList.snapshotChanges().subscribe(action => {
            action.payload.val() != null ? this.unread = action.payload.val() : {};
            if (this.unread != null && this.unread[userId]) {
                this.returnUnread.changeUnreadCount(this.unread);
            } else {
                this.returnUnread.changeUnreadCount(this.unread);
            }
        });
    }
}