import { Directive, Input, Output } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as queryString from 'query-string';

@Directive({
    selector: '[unreadMessages]',
    exportAs: 'unread'
})
export class UnreadMessagesDirective {

    @Input('room_id') private room_id: number;
    @Output('unread') unread: number;
    private user: object = {};
    unreadList$: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {
        this.user = queryString.parse(localStorage['user']);
    }

    ngAfterViewInit() {
        this.unreadList$ = this.db.object('chats/' + this.room_id + '/unread');
        this.unreadList$.snapshotChanges().subscribe(action => {
            if (action.payload.val() != null) {
                this.unread = action.payload.val()[this.user['id']];
            }
        });
    }
}