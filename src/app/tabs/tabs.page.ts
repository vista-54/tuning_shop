import { Component } from '@angular/core';
import * as queryString from 'query-string';
import { UnreadMessageClass } from '../modals/unread-message';
import { DataUnreadCountService } from '../shared/providers/data-unread';
import { DataNotificationService } from '../shared/providers/data-notification';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  count;
  subChats;
  private undearClass;
  private user: object = {};
  unreadArr: Array<object> = [];
  private countMessage: number = 0;
  chatList: AngularFireObject<any>;
  private chats: Array<number> = [];

  constructor(
    public db: AngularFireDatabase,
    private unreadCount: DataUnreadCountService,
    private notificationData: DataNotificationService
  ) { }

  ionViewWillEnter() {
    this.user = queryString.parse(localStorage['user']);
    this.notificationData.currentNotification.subscribe((count: number) => {
      this.countMessage = count;
    });
    this.unreadCount.currentUnreadCount.subscribe(unread => {
      if (unread != null) {
        let roomIndex = this.unreadArr.findIndex(el => el['room_id'] == unread['room_id']);
        if (roomIndex !== -1) {
          this.unreadArr[roomIndex] = unread;
          this.sumUnread();
        } else {
          this.unreadArr.push(unread);
          this.sumUnread();
        }
      }
    });
    this.chatList = this.db.object('chatList/' + this.user['id']);
    this.subChats = this.chatList.snapshotChanges().subscribe(action => {
      action.payload.val() != null ? this.chats = action.payload.val() : this.chats = [];
      this.startCount();
    });
  }

  startCount() {
    this.count = 0;
    this.chats.map(roomId => {
      this.undearClass = new UnreadMessageClass(this.db, this.unreadCount);
      this.undearClass.getUnread(roomId, this.user['id'])
    });
  }

  async sumUnread() {
    this.count = 0;
    this.unreadArr.map(el => {
      if (el[this.user['id']]) {
        this.count += el[this.user['id']];
      }
    });
  }
}
