import { Injectable } from "@angular/core";
import { Request } from '../interfaces/request.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as queryString from 'query-string';
import { tap } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { LoadingController, Platform } from '@ionic/angular';
import { LoadingService } from './loading.service';
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class RequestService implements Request {

    // loading;

    constructor(
        private router: Router,
        private network: Network,
        private http: HttpClient,
        private platform: Platform,
        private loading: LoadingService,
        private toastService: ToastService,
        private loadingController: LoadingController) {
    }

    public get(url: string, body: object = null, loader: boolean = true) {
        if (this.internetDetect()) {
            if (loader) this.loading.present();
            if (body !== null) {
                if (Object.keys(body).length > 0) {
                    url += '?' + queryString.stringify(body);
                }
            }
            return this.http.get(url)
                .pipe(tap(() => {
                    if (loader) this.loading.dismiss();
                }, error => {
                    this.toastService.toast('danger', error);
                }));
        } else {
            this.toastService.toast('danger', 'Плохое соединение с интернетом');
        }
    }

    public post(url: string, credentials: any, loader: boolean = true) {
        if (this.internetDetect()) {
            if (loader) this.loading.present();
            return this.http.post(url, credentials)
                .pipe(tap(() => {
                    if (loader) this.loading.dismiss();
                }, error => {
                    this.toastService.toast('danger', error);
                }));
        } else {
            this.toastService.toast('danger', 'Плохое соединение с интернетом');
        }
    }

    public put(url: string, credentials: any, loader: boolean = true) {
        if (this.internetDetect()) {
            if (loader) this.loading.present();
            return this.http.put(url, credentials)
                .pipe(tap(() => {
                    if (loader) this.loading.dismiss();
                }, error => {
                    this.toastService.toast('danger', error);
                }));
        } else {
            this.toastService.toast('danger', 'Плохое соединение с интернетом');
        }
    }

    public delete(url: string, data: object = null, loader: boolean = true) {
        if (this.internetDetect()) {
            if (loader) this.loading.present();
            return this.http.delete(url)
                .pipe(tap(() => {
                    if (loader) this.loading.dismiss();
                    this.toastService.toast('success', 'Данные успешно удалены');
                }, error => {
                    this.toastService.toast('danger', error);
                }));
        } else {
            this.toastService.toast('danger', 'Плохое соединение с интернетом');
        }
    }

    public getFile(url: string, body: object = null, loader: boolean = true) {
        if (this.internetDetect()) {
            if (loader) this.loading.present();
            if (body !== null) {
                if (Object.keys(body).length > 0) {
                    url += '?' + queryString.stringify(body);
                }
            }
            return this.http.get(url, { responseType: 'text' })
                .pipe(tap(() => {
                    if (loader) this.loading.dismiss();
                }, error => {
                    this.toastService.toast('danger', error);
                }));
        } else {
            this.toastService.toast('danger', 'Плохое соединение с интернетом');
        }
    }

    internetDetect() {
        if (this.platform.is('cordova')) {
            if (this.network.type == null ||
                this.network.type === this.network.Connection.UNKNOWN ||
                this.network.type === this.network.Connection.NONE ||
                this.network.type === this.network.Connection.CELL_2G) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}