import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from "./register.page";
import { AuthService } from '../shared/services/auth.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: RegisterPage }])
    ],
    declarations: [RegisterPage],
    providers: [
        AuthService
    ]
})
export class RegisterPageModule { }
