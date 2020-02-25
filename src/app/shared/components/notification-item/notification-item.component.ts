import * as queryString from 'query-string';
import { Component, Input } from '@angular/core';
import { PopoverController, Platform } from '@ionic/angular';
import { SelectPopupComponent } from '../select-popup/select-popup.component';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {

  @Input('index') private index: number;
  @Input('loading') private loading: boolean;
  @Input('cssClass') private cssClass: string;
  @Input('notification') private notification: any = null;

  private user: object = {};

  constructor(
    private platform: Platform,
    private popoverController: PopoverController) {
    this.user = queryString.parse(localStorage['user']);
  }

  ngAfterViewInit() {
    if (this.notification) {
      let target = document.querySelector('#content_div' + this.index);
      let div = document.createElement('div');
      div.innerHTML = this.notification['text'];
      target.parentNode.insertBefore(div, target);
      target.parentNode.insertBefore(div, target.nextSibling);
    }
  }

  getStyle(style: string) {
    if (this.notification && this.notification.message_creator_id === this.user['id'], this.platform['doc']['location']['pathname'].includes('/app/tabs/chat/dialog/')) {
      switch (style) {
        case 'background': {
          return '#6794FF';
        }
        case 'color': {
          return '#000';
        }
        case 'margin': {
          return '15px 15px 15px auto';
        }
      }
    }
  }


  async selectPopup(ev: any) {
    const popover = await this.popoverController.create({
      component: SelectPopupComponent,
      componentProps: { new: this.notification, type: 'notification', share: true },
      event: ev,
      translucent: true
    });
    await popover.present();
  }

}
