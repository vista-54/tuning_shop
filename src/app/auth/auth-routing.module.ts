import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ConfirmPage } from './confirm-code/confirm-code.page';
import { ChangePage } from './change/change.page';
import { AuthService } from './shared/services/auth.service';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { ConfirmComponent } from './confirm-code/confirm-code.component';
// import { ChangeComponent } from './change/change.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full', },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage, resolve: { data: AuthService } },
    { path: 'forgot-password', component: ForgotPasswordPage },
    { path: 'confirm', component: ConfirmPage },
    { path: 'change', component: ChangePage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthPageRoutingModule { }
