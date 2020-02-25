import { Router } from '@angular/router';
import * as queryString from 'query-string';
import { Component, NgZone } from '@angular/core';
import { UserService } from './user/shared/services/user.service';
import { CartComponent } from './../../shared/components/cart/cart.component';
import { ModalController, AlertController, Platform, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  private user: object = {};
  private status = true;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private _user: UserService,
    private platform: Platform,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private modalController: ModalController) { }

  ionViewWillEnter() {
    this.status = true;
    this.user = queryString.parse(localStorage['user']);
    // console.log(this.navCtrl, 'nav');

  }

  openCanal() {
    window.open('https://m.youtube.com/channel/UCLAZBCysrdf5qlzNZOCChNA');
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  async exit() {
    const alert = await this.alertController.create({
      header: 'Внимание!',
      message: 'Вы точно хотите выйти?',
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
            if (this.status) {
              this.status = false;
              this._user.logout().subscribe(res => {
                localStorage.clear();
                localStorage['login'] = false;
                localStorage['exit'] = true;
                this.router.navigate(['/auth']);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }


  // async back() {
  //   var lastTimeBackPress = 0;
  //   var timePeriodToExit = 2000;

  //   this.platform.backButton.subscribe(() => {
  //     let view = this.navCtrl['router'].routerState.snapshot.url;
  //     if (view == "/app/tabs/menu" || view == "/auth/login") {
  //       localStorage['exit'] = false;
  //       if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
  //         localStorage['exit'] = true;
  //         navigator['app'].exitApp();
  //       } else {
  //         this.toast();
  //         lastTimeBackPress = new Date().getTime();
  //       }
  //     } else {
  //       window.history.back();
  //     }
  //     // console.warn(NgZone.isInAngularZone()); // false
  //     if (!NgZone.isInAngularZone()) {
  //       this.ngZone.run(() => {
  //         console.warn(NgZone.isInAngularZone()); // true
  //       });
  //     }
  //   });
  // }

  async toast() {
    let toast = await this.toastCtrl.create({
      message: 'Нажмите еще раз что б Выйти',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
