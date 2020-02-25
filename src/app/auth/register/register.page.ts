import { FirebaseAuthService } from './../shared/services/firebase-auth';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['../auth.page.scss', './register.page.scss']
})
export class RegisterPage {

    public reg: FormGroup;
    public roles: any;
    customAlertOptions: any = {
        header: 'Роль',
        subHeader: 'Выберите роль пользователя',
        translucent: true
    };

    private specializations: Array<object> = [];
    private pwdPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private toast: ToastService,
        private route: ActivatedRoute,
        public auth: AuthService,
        private fireAuth: FirebaseAuthService
    ) {
        this.reg = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]],
            role_id: ['', [Validators.required]],
            invite_code: [''],
            about: [''],
            specialization: [[]]
        });
    }

    async ionViewWillEnter() {
        this.specializations = this.route.snapshot.data['data']['entity'];
        this.auth.getRole().subscribe(res => {
            this.roles = res['entity'];
        });
    }

    regForm() {
        if (this.reg.value.specialization.length > 3) {
            this.toast.toast('danger', 'Вы можете выбрать только 3 специализации');
        } else {
            this.reg.value.email.toLowerCase();
            this.auth.signUp(this.reg.value).subscribe(res => {
                if (res['status']) {
                    this.fireAuth.fireRegister(this.reg.value.email, this.reg.value.password);
                    this.reg.reset();
                }
            });
        }
    }

    back() {
        this.router.navigate(['auth/login']);
    }

    openRegister() {
        this.router.navigate(['auth/register']);
    }
}
