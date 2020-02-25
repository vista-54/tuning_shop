import { ToastService } from './shared/services/toast.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, AlertController, IonRouterOutlet, ModalController, ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NetworkService } from './shared/services/network.service';
import { DataNotificationService } from './shared/providers/data-notification';
import { NotificationService } from './tabs/notifications/shared/services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private page;
  private isConnected = true;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private fcm: FCM,
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public networkService: NetworkService,
    private alertController: AlertController,
    private _notification: NotificationService,
    private notificationData: DataNotificationService,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {
    localStorage['exit'] = true;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.networkSubscriber();
      if (!localStorage['cart']) {
        localStorage['cart'] = JSON.stringify([]);
      }
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#4d6ff8');
      this.fcm.subscribeToTopic('marketing');

      this.fcm.getToken().then(token => {
        localStorage['tokenDevice'] = token;
      });

      this.fcm.onNotification().subscribe(data => {
        if (data['type'] != 'message') {
          this._notification.count().subscribe(res => {
            this.notificationData.changeNotification(res['entity']);
          });
        }
        if (data.wasTapped) {
          if (data['type'] == 'message') {
            this.router.navigate(['/app/tabs/chat/dialog', data['chat_id']], { queryParams: { member_1: data['user_id'], avatar: data['avatar'], name: data['name'], surname: data['surname'] } });
          } else {
            this.router.navigate(['tabs/tabs/notifications']);
          }
        }
      });

      this.fcm.unsubscribeFromTopic('marketing');

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.back();
      // this.platform.backButton.subscribe(() => {

      //   if (location.pathname == '/auth/login') {
      //     this.page = 'login';
      //     this.presentAlertConfirm();
      //   } else if (location.pathname == '/app/tabs/menu') {
      //     this.page = 'menu';
      //     this.presentAlertConfirm();
      //   }
      //   // code that is executed when the user pressed the back button
      // });
    });
  }

  networkSubscriber(): void {
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
        this.isConnected = connected;
        console.log('[Home] isConnected', this.isConnected);
        if(!this.isConnected){
          localStorage['login'] = false;
        }
        this.handleNotConnected(connected);
      });
  }

  handleNotConnected(connected: any) {
    this.router.navigate(['auth']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Внимание!',
      message: 'Вы точно хотите выйти?',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['/app/tabs/menu']);
          }
        }, {
          text: 'Да',
          handler: () => {
            if (this.page == 'login') {
              navigator['app'].exitApp();
            } else {
              window.localStorage.clear();
              this.router.navigate(['/auth/login']);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async back() {
    this.platform.backButton.subscribe(async () => {
      console.log('button back');
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/app/tabs/menu') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp(); // work for ionic 4
          } else {
            this.toast();
            this.lastTimeBackPress = new Date().getTime();
          }
        } else {
          window.history.back();
        }
      });
    });
  }

  async toast() {
    let toast = await this.toastCtrl.create({
      message: 'Нажмите еще раз что б Выйти',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
