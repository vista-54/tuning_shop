import { FirebaseAuthService } from './../shared/services/firebase-auth';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import * as queryString from 'query-string';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['../auth.page.scss', 'login.page.scss']
})
export class LoginPage {

    public log: any;
    public login: boolean = false;

    private pwdPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
    // unamePattern = '^[a-z0-9_-]{8,15}$';
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private fireAuth: FirebaseAuthService,
        public auth: AuthService,
        public afAuth: AngularFireAuth,
        public fcm: FCM,
        public platform: Platform) {
        this.log = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            login: [localStorage['login']]
        });
    }

    ionViewWillEnter() {

        let tokenDevice = localStorage['tokenDevice'];
        if (!tokenDevice) {
            this.platform.ready().then(() => {
                this.fcm.subscribeToTopic('marketing');
                this.fcm.getToken().then(token => {
                    localStorage['tokenDevice'] = token;
                });
                this.fcm.onTokenRefresh().subscribe(token => {
                    localStorage['tokenDevice'] = token;
                });
                this.fcm.unsubscribeFromTopic('marketing');
            });
        }
    }

    logForm() {
        this.log.value.email.toLowerCase();
        this.auth.signIn(this.log.value).subscribe(success => {

            if (success['success']) {
                localStorage['token'] = success['data']['token'];
                localStorage['user'] = queryString.stringify(success['data']['user']);
                localStorage['chats'] = success['data']['user']['chats'];
                localStorage['specializations'] = success['data']['user']['specializations'];
                if (!localStorage['cart']) localStorage['cart'] = JSON.stringify([]);
                this.fireAuth.fireLogin(this.log.value.email, this.log.value.password);
                if (this.platform.is('cordova')) {
                    this.auth.sendPushNot({ token: localStorage['tokenDevice'] }).subscribe();
                }
                this.log.reset();
                this.router.navigate(['/app/tabs']);
            }
        });
    }

    openRegister() {
        this.router.navigateByUrl('auth/register');
    }

    autologin(ev) {
        this.login = ev.detail.checked;
    }

    forgot() {
        this.router.navigate(['auth/forgot-password']);
    }

}
