import { Platform, NavController } from '@ionic/angular';
import * as queryString from 'query-string';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {

  @Input('shop') private shop: any;
  @Input('loading') private loading: boolean;
  @Input('cssClass') private cssClass: string;

  public slideOpts: any;
  private user: object = {};

  constructor(
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.user = queryString.parse(localStorage['user']);
    this.slideOpts = {
      effect: 'flip',
      autoHeight: true
    };
  }

  ngOnInit() { }

  getStyle(style: string) {
    if (this.shop && this.shop.message_creator_id === this.user['id'], this.platform['doc']['location']['pathname'].includes('/app/tabs/chat/dialog/')) {
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

  info() {
    this.navCtrl.navigateRoot(['/app/tabs/menu/item', this.shop['id']]);
  }

}
