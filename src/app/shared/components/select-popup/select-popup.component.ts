import * as queryString from 'query-string';
import { ShareComponent } from '../share/share.component';
import { Component, Input, AfterViewInit } from '@angular/core';
import { ModalController, PopoverController, AlertController, ActionSheetController } from '@ionic/angular';
import { NewsService } from 'src/app/tabs/news/shared/services/news.service';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss'],
})
export class SelectPopupComponent implements AfterViewInit {

  @Input('new') private new: any;
  @Input('type') private type: string;
  @Input('share') private share: boolean = false;

  private user: object = {};

  constructor(
    private _news: NewsService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private modalController: ModalController) { }

  ngAfterViewInit() {
    this.user = queryString.parse(localStorage['user']);
    if (this.new['user_id'] && Number(this.user['id']) !== this.new['user_id']) this.share = true;
    if (this.share) {
      this.sharePopup();
    } else {
      this.shared();
    }
  }

  async shared() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Выберите вариант',
      buttons: [
        {
          text: 'Переслать',
          icon: 'share',
          handler: () => {
            this.sharePopup();
          }
        },
        {
          text: 'Удалить',
          icon: 'trash',
          handler: () => {
            this.deleteItem();
          }
        },
        {
          text: 'Отмена',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    actionSheet.onDidDismiss().then(() => {
      // setTimeout(() => {
      //   this.popoverController.dismiss();
      // }, 100);
    });
    await actionSheet.present().then(() => {
      this.popoverController.dismiss();
    });
  }

  async sharePopup() {
    // setTimeout(() => {
    //   this.popoverController.dismiss();
    // }, 50);
    const modal = await this.modalController.create({
      component: ShareComponent,
      cssClass: 'shareModal',
      componentProps: { new: this.new, type: this.type }
    });
    return await modal.present().then(() => {
      this.popoverController.dismiss();
    });
  }

  socialShare() {
    this.popoverController.dismiss();
  }

  async deleteItem() {
    const alert = await this.alertController.create({
      header: 'Внимание!',
      message: 'Вы действительно хотите удалить запись?',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Да',
          handler: () => {
            this._news.deleteOnce(this.new).subscribe(res => {
              if (res['status']) {
                this.popoverController.dismiss({ reload: true });
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
