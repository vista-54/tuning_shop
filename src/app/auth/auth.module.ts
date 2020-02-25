import { FirebaseModule } from './../shared/firebase.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageRoutingModule } from "./auth-routing.module";
import { AuthPage } from "./auth.page";
import { AuthService } from './shared/services/auth.service';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ConfirmPage } from './confirm-code/confirm-code.page';
import { ChangePage } from './change/change.page';
import { SharedModule } from '../shared/shared.module';
import { FirebaseAuthService } from './shared/services/firebase-auth';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        AuthPageRoutingModule,
        FirebaseModule
    ],
    declarations: [
        AuthPage,
        LoginPage,
        RegisterPage,
        ForgotPasswordPage,
        ConfirmPage,
        ChangePage
    ],
    providers: [
        AuthService,
        FirebaseAuthService
    ]
})
export class AuthModule { }
