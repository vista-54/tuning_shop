import { FirebaseAuthService } from './../shared/services/firebase-auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

declare interface UserData {
    code: string;
    password: string;
    passwordConfirm: string;
}

@Component({
    selector: 'app-change',
    templateUrl: './change.page.html',
    styleUrls: ['../auth.page.scss', './change.page.scss']
})
export class ChangePage implements OnInit {

    public change: any;
    private email: string;

    constructor(
        public router: Router,
        public auth: AuthService,
        public route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private _firebase: FirebaseAuthService
    ) {
        this.email = this.route.snapshot.queryParams['email'];
        let code = this.route.snapshot.queryParams['code'];
        this.change = this.formBuilder.group({
            code: [code, [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        console.log('Sign Up component is loaded');
    }

    changeForm() {
        this.auth.change(this.change.value).subscribe(res => {
            if (res['status']) {
                this._firebase.fireChangePassword(this.change.value.password, this.email);
            }
        });
    }

    back() {
        window.history.back();
    }

    openRegister() {
        this.router.navigate(['auth/register']);
    }

    openLogin() {
        this.router.navigate(['auth/login']);
    }

}
