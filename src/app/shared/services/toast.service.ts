import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {


    private config: object = {};
    constructor(private toastController: ToastController, private router: Router) { }

    toast(type: any, data: any) {
        debugger
        console.log(data, 'error');
        this.config['type'] = type;
        if (data instanceof HttpErrorResponse) {
            if (data['error'] instanceof Object && !data['error']['message']) {
                if (data.status === 401) {
                    this.router.navigate(['auth']);
                    this.presentToastWithOptions('Время сессии истекло', 'Ок', this.config);
                    return;
                }
                for (let item in data['error']) {
                    this.config['life'] = 0;
                    if (item !== 'success' && item !== 'message') this.presentToastWithOptions(data['error'][item][0], 'Ок', this.config);
                }
            }
            if (data['error']['errors'] instanceof Object && data['error']['message'] == null) {
                for (let item in data['error']['errors']) {
                    this.config['life'] = 0;
                    this.presentToastWithOptions(data['error']['errors'][item][0], 'Ок', this.config);
                }
            }
            if (typeof data['error']['message'] === 'string' && data['error']['message'].length > 0) {
                this.config['life'] = 0;
                this.presentToastWithOptions(data['error']['message'], 'Ок', this.config);
            }
            if (data['error']['message'] != null && data['error']['message'].length === 0) {
                this.presentToastWithOptions('Ошибка на стороне сервера', 'Ok', this.config);
            }

        } else {
            if (!data['status']) {
                this.config['life'] = 2000;
                this.presentToastWithOptions(data, null, this.config);
            }
        }
    }

    async presentToastWithOptions(message, button, config) {
        const toast = await this.toastController.create({
            message,
            showCloseButton: !config['life'],
            position: 'top',
            duration: config['life'],
            color: config['type'],
            cssClass: 'normalToast',
            closeButtonText: button
        });
        toast.present();
    }
}