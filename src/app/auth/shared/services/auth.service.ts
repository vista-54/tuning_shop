import { APP_URL } from './../../../shared/constants/url';
import { Injectable } from "@angular/core";
import { RequestService } from "../../../shared/services/request.service";
import { tap } from "rxjs/operators";
import { Router, Resolve } from "@angular/router";
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class AuthService implements Resolve<any>{

    constructor(public request: RequestService, public toast: ToastService, public router: Router) { }

    resolve() {
        return this.getSpec();
    }

    getSpec() {
        return this.request.get(APP_URL.auth.specialization);
    }

    signIn(data: any) {
        return this.request.post(APP_URL.auth.login, data)
            .pipe(tap(res => {
                if (res['status']) {
                    window.localStorage.setItem('login', data['login']);
                } else {
                    this.toast.toast('danger', res['error']);
                }
            }, err => {
                this.toast.toast('danger', err.error.error);
            }));
    }

    signUp(data: any) {
        return this.request.post(APP_URL.auth.register, data)
            .pipe(tap(res => {
                if (res['status']) {
                    this.toast.toast('success', 'Регистрация прошла успешно');
                    this.router.navigate(['auth/login']);
                } else {
                    this.toast.toast('danger', 'Возникла ошибка');
                }
            }, err => {
                this.toast.toast('danger', err.error.error);
            }));
    }

    forgot(credentials) {
        return this.request.post(APP_URL.auth.forgot, credentials)
            .pipe(tap(res => {
                if (res['status']) {
                    this.router.navigate(['auth/confirm'], { queryParams: { email: credentials['email'] } });
                } else {
                    this.toast.toast('danger', res['error']);
                }
            }, err => {
                this.toast.toast('danger', err.error.error);
            }));
    }

    confirm(credentials) {
        return this.request.post(APP_URL.auth.confirm, credentials)
            .pipe(tap(res => {
                if (res['status']) {
                    this.router.navigate(['auth/change'], { queryParams: { code: credentials['code'], email: credentials['email'] } });
                } else {
                    this.toast.toast('danger', res['error']);
                }

            }, err => {
                this.toast.toast('danger', err.error.error);
            }));
    }

    change(credentials) {
        if (credentials['password'] === credentials['passwordConfirm']) {
            return this.request.post(APP_URL.auth.change, credentials)
                .pipe(tap(res => {
                    if (res['status']) {
                        this.toast.toast('success', 'Пароль был успешно изменен');
                        this.router.navigate(['auth/login']);
                    } else {
                        this.toast.toast('danger', res['error']);
                    }
                }, err => {
                    this.toast.toast('danger', err.error.error);
                }));
        } else {
            this.toast.toast('danger', 'Не удалось сменить пароль');
        }
    }

    getRole() {
        return this.request.get(APP_URL.auth.role);
    }

    sendPushNot(data) {
        return this.request.post(APP_URL.auth.save, data);
    }
}