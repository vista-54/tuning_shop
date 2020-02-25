import { File } from '@ionic-native/file/ngx';
import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { VideoComponent } from '../video/video.component';

@Component({
    selector: 'app-chat-file',
    templateUrl: './chat-file.component.html',
    styleUrls: ['./chat-file.component.scss'],
})
export class ChatFileComponent {

    @Input('user') private user;
    @Input('message') private message;
    @Input('loading') private loading;


    constructor(private file: File,
        private photo: PhotoViewer,
        private fileOpener: FileOpener,
        private transfer: FileTransfer,
        private document: DocumentViewer,
        private modalController: ModalController) {
    }

    getImage(type: string) {
        return type.includes('image');
    }

    getApplication(type: string) {
        return type.includes('application');
    }

    getVideo(type: string) {
        return type.includes('video');
    }

    openDoc(url: any, doc: any) {
        this.fileOpener.open(url, doc['fileType'])
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
    }

    openImg(image) {
        this.photo.show(image['fileUrl'], image['fileName'], { share: true });
    }

    download(item) {
        item['loading'] = true
        if (item['fileUrl'].includes('http')) {
            const fileTransfer: FileTransferObject = this.transfer.create();
            fileTransfer.download(item['fileUrl'], this.file.dataDirectory + item['fileName']).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                item['loading'] = false;
                item['done'] = true;
                item['fileUrl'] = entry.toURL();
                this.openDoc(entry.toURL(), item);
            }, (error) => {
            });
        } else {
            this.openDoc(item['fileUrl'], item);
        }
    }

    async openVideo(name: string, url: string, type: string) {
        const modal = await this.modalController.create({
            component: VideoComponent,
            componentProps: { name, url, type },
        });
        return await modal.present();
    }

}
