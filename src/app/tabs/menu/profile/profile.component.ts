import { ToastService } from 'src/app/shared/services/toast.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProfileService } from './shared/services/profile.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as queryString from 'query-string';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  private checked = false;
  private user: object = {};
  private profile: FormGroup;
  private specializations: Array<object> = [];

  constructor(
    private camera: Camera,
    private fb: FormBuilder,
    private _toast: ToastService,
    private route: ActivatedRoute,
    private _profile: ProfileService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
  ) {
    this.profile = this.fb.group({
      id: new FormControl(null),
      avatar: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      specialization: new FormControl([]),
      city: new FormControl(''),
      address: new FormControl(''),
      sex: new FormControl(''),
      birthday: new FormControl(null),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl(''),
      about: new FormControl(''),
      instagram: new FormControl(''),
      vk: new FormControl('')
    });
  }

  ionViewWillEnter() {
    this.specializations = this.route.snapshot.data['data']['entity'];
    this.profile.patchValue(this.route.snapshot.data['resolve']['entity']);
    this.user = this.route.snapshot.data['resolve']['entity'];
    console.log(this.profile);
  }

  ionViewDidLeave() {
    this.checked = false;
  }

  update() {
    if (this.user['avatar'].includes('data:image/jpeg;base64,')) {
      this.profile.patchValue({ avatar: this.user['avatar'] });
    }
    this._profile.updateUser(this.profile.value).subscribe(user => {
      localStorage['user'] = queryString.stringify(user);
    });
  }

  async openNewPasswordPopup() {
    const alert = await this.alertController.create({
      header: 'Смена пароля',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль'
        },
        {
          name: 'passwordConfirm',
          type: 'password',
          placeholder: 'Подтвердите пароль'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data['password'] === data['passwordConfirm']) {
              this._profile.updateUser({ password: data['password'], id: this.user['id'] }).subscribe(res => {
                if (res) {
                  this._toast.toast('success', 'Пароль успешно изменен');
                }
              });
            } else {
              this._toast.toast('danger', 'Пароли не совпадают, попробуйте еще раз');
            }
          }
        }
      ]
    });

    await alert.present();
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
      targetWidth: 768,
      targetHeight: 768,
      saveToPhotoAlbum: false
    };
    const imageData = 'data:image/jpeg;base64,' + await this.camera.getPicture(options);
    this.user['avatar'] = imageData;
  }
}