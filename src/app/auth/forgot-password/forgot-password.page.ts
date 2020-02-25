import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";


declare interface ForgotData {
    email: string;
}

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['../auth.page.scss', './forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {

    // public userData: ForgotData;
    public forgot_password: any;

    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(
        private formBuilder: FormBuilder,
        public auth: AuthService,
        public router: Router
    ) {
        this.forgot_password = this.formBuilder.group({
            email: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        console.log('Sign Up component is loaded');
    }

    forgotPasswordForm() {
        this.forgot_password.value.email.toLowerCase();
        this.auth.forgot(this.forgot_password.value).subscribe();
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
