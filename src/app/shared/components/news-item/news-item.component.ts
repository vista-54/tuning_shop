import { CommentsComponent } from './../comments/comments.component';
import * as queryString from 'query-string';
import { Component, Input, AfterViewInit } from '@angular/core';
import { PopoverController, Platform, NavController, ModalController } from '@ionic/angular';
import { SelectPopupComponent } from 'src/app/shared/components/select-popup/select-popup.component';
import { OpenInstagram } from '../open-instagram.component';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {

  @Input('new') private new: any;
  @Input('loading') private loading: boolean;
  @Input('cssClass') private cssClass: string;

  public slideOpts: any;
  private user: object = {};

  constructor(
    private platform: Platform,
    public opeInst: OpenInstagram,
    private navCtrl: NavController,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.user = queryString.parse(localStorage['user']);
    this.slideOpts = {
      effect: 'flip',
      autoHeight: true
    };
  }

  getStyle(style: string) {
    if (this.new && this.new.message_creator_id === this.user['id'], this.platform['doc']['location']['pathname'].includes('/app/tabs/chat/dialog/')) {
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
      componentProps: { new: this.new, type: 'news' },
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then(res => { if (res['data'] && res['data']['reload']) this.new = null; });
    await popover.present();
  }

  async openComments(itemId: number, userId: number) {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      componentProps: { typeUrl: 'news', itemId, userId }
    });
    modal.onDidDismiss().then(res => {
      this.new['comment_count'] = res['data']['totalItems'];
    });
    return await modal.present();
  }

  openUser(id: number) {
    this.navCtrl.navigateRoot(['/app/tabs/menu/user', id]);
  }

  openInst(instagram: string) {
    this.opeInst.openInst(instagram);
  }

  openVK(vk: string) {
    this.opeInst.openVK(vk);
  }

}
