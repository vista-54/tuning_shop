import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare interface UserData {
    email: string;
    code: string;
}

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm-code.page.html',
    styleUrls: ['../auth.page.scss', './confirm-code.page.scss']
})
export class ConfirmPage implements OnInit {

    public confirm: any;
    private email: string;

    constructor(
        private formBuilder: FormBuilder,
        public auth: AuthService,
        private route: ActivatedRoute,
        public router: Router) {
        this.email = this.route.snapshot.queryParams['email'];
        this.confirm = this.formBuilder.group({
            code: new FormControl('', [Validators.required]),
            email: new FormControl(this.email)
        });
    }

    ngOnInit() {
        // console.log(this.route.queryParams['_value'].email);
        // this.userData.email = this.route.queryParams['_value'].email;
        // console.log('Sign Up component is loaded');
    }

    confirmCodeForm() {
        this.auth.confirm(this.confirm.value).subscribe();
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
