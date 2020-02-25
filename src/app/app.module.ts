import { NgModule } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NetworkService } from './shared/services/network.service';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AutologinGuard } from './shared/guard/autologin-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataNotificationService } from './shared/providers/data-notification';
import { NotificationService } from './tabs/notifications/shared/services/notification.service';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    FCM,
    File,
    Camera,
    WebView,
    Network,
    FilePath,
    StatusBar,
    FileChooser,
    InAppBrowser,
    SplashScreen,
    IOSFilePicker,
    NetworkService,
    AutologinGuard,
    AppAvailability,
    NotificationService,
    DataNotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
