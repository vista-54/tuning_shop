import { FirebaseModule } from './../../shared/firebase.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from "./login.page";
import { AuthService } from '../shared/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: LoginPage }]),
        FirebaseModule
    ],
    declarations: [LoginPage],
    providers: [
        AuthService
    ]
})
export class LoginPageModule {
}
