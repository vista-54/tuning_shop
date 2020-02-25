import { OpenInstagram } from './components/open-instagram.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { ToastService } from './services/toast.service';
import { AuthenticationInterceptor } from './services/authentication.interceptor';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HttpClientModule
    ],
    declarations: [
    ],
    providers: [
        RequestService,
        ToastService,
        OpenInstagram,
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true, },
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
    ]
})
export class SharedModule { }