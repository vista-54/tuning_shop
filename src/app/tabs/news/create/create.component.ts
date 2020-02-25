import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NewsService } from '../shared/services/news.service';
import * as queryString from 'query-string';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  public description: string = '';
  public slides: any;
  public user: object = {};
  public slideOpts: object = {};
  public files: string[] = [];

  constructor(
    private navCtrl: NavController,
    private _news: NewsService,
    private actionSheetController: ActionSheetController,
    private camera: Camera
  ) {
    this.slideOpts = {
      effect: 'flip',
      autoHeight: true
    };
  }

  ngOnInit() {
    this.user = queryString.parse(localStorage['user']);
  }

  create() {
    if (this.description.trim().length) {
      this._news.create({ description: this.description, files: this.files }).subscribe(res => {
        if (res['status']) {
          this.description = '';
          this.files = [];
          this.back();
        }
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Выберите вариант',
      buttons: [
        {
          text: 'Камера',
          icon: 'camera',
          handler: () => {
            this.getPicture(1);
          }
        },
        {
          text: 'Альбом',
          icon: 'image',
          handler: () => {
            this.getPicture(0);
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
    await actionSheet.present();
  }

  async getPicture(source: number) {
    const options: CameraOptions = {
      destinationType: 0,
      sourceType: source,
      allowEdit: true,
      encodingType: 0,
      // targetWidth: 1200,
      // targetHeight: 1200,
      saveToPhotoAlbum: false
    };
    const imageData = 'data:image/jpeg;base64,' + await this.camera.getPicture(options);
    this.files.push(imageData);
    setTimeout(() => {
      const slides = document.querySelector('ion-slides');
      slides.update();
    }, 100);
  }

  deleteImage(index: number) {
    const slides = document.querySelector('ion-slides');
    this.files.splice(index, 1);
    setTimeout(() => {
      slides.update();
    }, 100);
  }

  back() {
    this.navCtrl.navigateRoot(['app/tabs/news']);
  }

}
