import * as queryString from 'query-string';
import { NavController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { ChatsListService } from 'src/app/tabs/chat/chats-list/shared/services/chats-list.service';

@Component({
  selector: 'app-collegue-item',
  templateUrl: './collegue-item.component.html',
  styleUrls: ['./collegue-item.component.scss'],
})
export class CollegueItemComponent {

  @Input('collegue') private collegue: any;
  @Input('loading') private loading: boolean;

  private user: object = {};

  constructor(
    private navCtrl: NavController,
    private _chat: ChatsListService) { }

  ngAfterViewInit() {
    this.user = queryString.parse(localStorage['user']);
  }

  chat() {
    this._chat.create({ member_1: this.collegue['id'], member_2: this.user['id'] }).subscribe(res => {
      this.navCtrl.navigateRoot(['/app/tabs/chat/dialog', res['id']], { queryParams: { member_id: this.collegue['id'] } });
    });
  }

  complaint(member_1: number) {
    this.navCtrl.navigateRoot(['/app/tabs/menu/claim'], { queryParams: { user_id: member_1 } });
  }

  openCollegue(id: number) {
    this.navCtrl.navigateRoot(['/app/tabs/menu/user', id], { queryParams: { collegue: 'collegue' } });
  }
}
