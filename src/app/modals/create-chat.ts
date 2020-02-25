import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

export class CreateChatClass {

    subChats;
    subUnred;
    private chats;
    private unread: object = {};

    chatList: AngularFireObject<any>;
    unreadList: AngularFireObject<any>;

    constructor(public db: AngularFireDatabase) { }

    public checkChat(roomId: number, userId: number, status: string) {
        this.chatList = this.db.object('chatList/' + userId);
        this.unreadList = this.db.object('chats/' + roomId + '/unread');
        this.subChats = this.chatList.snapshotChanges().subscribe(action => {
            let rm = true;
            action.payload.val() != null ? this.chats = action.payload.val() : this.chats = [];
            let x = this.chats.findIndex(room => room == roomId);
            if (status === 'delete') {
                
                this.chats.splice(x, 1);
                this.subUnred = this.unreadList.snapshotChanges().subscribe(action => {
                    this.unreadList.remove();
                    this.chatList.remove();
                    this.chatList.update(this.chats);
                    this.subUnred.unsubsribe();
                });
            }
            if (status === 'create') {
                if (x === -1) {
                    this.chats.push(roomId);
                }
                this.chatList.remove();
                this.chatList.update(this.chats);
                this.subChats.unsubsribe();
            }
        });
    }
}