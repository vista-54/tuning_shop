import { ChatsListService } from 'src/app/tabs/chat/chats-list/shared/services/chats-list.service';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ColleguesService } from 'src/app/tabs/menu/collegues/shared/services/collegues.service';
import { APP_URL } from '../../constants/url';
import * as queryString from 'query-string';
import { SendMessageFirebaseClass } from 'src/app/modals/send-message-firebase';
import { ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent extends InfinityScroll implements AfterViewInit {

  @Input('new') private new: object;
  @Input('type') private type: string;

  private user: object = {};
  private shareCount: number = 0;
  private users: Array<number> = [];
  private messanger: any;

  constructor(
    private db: AngularFireDatabase,
    private _chat: ChatsListService,
    private modalCtrl: ModalController,
    public _collegues: ColleguesService,
    public changeDetector: ChangeDetectorRef
  ) {
    super(_collegues, changeDetector);
    this.customUrl = APP_URL.collegues['my'];
  }

  ngAfterViewInit() {
    this.user = queryString.parse(localStorage['user']);
    this._collegues.get(null, null, this.customUrl).subscribe(chats => {
      this.toItems = chats['entity']['to'];
      this.list = chats['entity']['data'];
      this.currentPage = chats['entity']['current_page'];
      this.totalItems = chats['entity']['total'];
      this.loading = false;
      console.log(this.list);
    });
  }

  selectShare(userId: number) {
    let x = this.users.indexOf(userId);
    if (x !== -1) {
      this.users.splice(x, 1);
    } else {
      this.users.push(userId);
    }
    console.log(this.users);

  }

  getSelect(userId: number) {
    let x = this.users.indexOf(userId);
    if (x !== -1) {
      return true;
    } else {
      return false;
    }
  }

  sendRecord() {
    this.shareCount = 0;
    this.users.map(id => {
      this.shareCount++;
      this._chat.create({ member_1: id, member_2: this.user['id'] }).subscribe(res => {
        if (res) {
          this.new['message_creator_id'] = this.user['id'];
          this.messanger = new SendMessageFirebaseClass(this.db);
          this.messanger.sendMessage(res['id'], this.new, id, this.type);
        }
      });
    });
    this.modalCtrl.dismiss();
  }

}
