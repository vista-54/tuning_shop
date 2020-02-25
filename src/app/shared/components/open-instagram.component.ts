import { Injectable } from "@angular/core";
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class OpenInstagram {

    constructor(
        public appAvailability: AppAvailability,
        public platform: Platform,
        public inAppBrowser: InAppBrowser, ) {
    }

    openInst(instagram: string) {
        if (instagram != null) {
            let name = instagram.split('https://www.instagram.com/')[1];
            this.launchApp('instagram://', 'com.instagram.android', 'instagram://user?username=' + name, 'https://www.instagram.com/' + name);
        }
    }

    openVK(vk: string) {
        if (vk != null) {
            const browser: InAppBrowserObject = this.inAppBrowser.create(vk, '_system');
        }
    }

    private launchApp(iosApp: string, androidApp: string, appUrl: string, webUrl: string) {
        let app: string;
        // check if the platform is ios or android, else open the web url
        if (this.platform.is('ios')) {
            app = iosApp;
        } else if (this.platform.is('android')) {
            app = androidApp;
        } else {
            const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
            return;
        }
        this.appAvailability.check(app).then(
            () => {
                // success callback, the app exists and we can open it
                const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
            },
            () => {
                // error callback, the app does not exist, open regular web url instead
                const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
            }
        );
    }
}