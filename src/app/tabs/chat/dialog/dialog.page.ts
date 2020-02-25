import { SetAmazonFileClass } from './../../../modals/set-amazon-file';
import * as queryString from 'query-string';
import { ActionSheetController, NavController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { SendMessageFirebaseClass } from 'src/app/modals/send-message-firebase';
import { DialogService } from './shared/services/dialog.service';
import { FileService } from 'src/app/shared/services/file.service';

declare interface Message {
    user_id: number;
    message: string;
    date: any;
    room_id: number;
    username: string;
};

@Component({
    selector: 'page-dialog',
    templateUrl: './dialog.page.html',
    styleUrls: ['./dialog.page.scss']
})
export class DialogPage {

    @ViewChild('content', { static: false }) private content: any;
    @ViewChild('textarea', { static: false }) private textarea: any;
    private limit = 30;
    private name: string;
    private messanger: any;
    private avatar: string;
    private room_id: number;
    private diferent: number;
    private surname: string;
    private alian_id: number;
    private firstLoad = true;
    private user: object = {};
    private unread: object = {};
    private message: string = '';
    private fileLoad: boolean = false;
    private limit$: BehaviorSubject<number | null>;
    private fileUnload: Array<any> = [];
    private fileUpload: Array<object> = [];
    messages: Observable<any[]>;
    messagesList$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

    constructor(private camera: Camera,
        private _file: FileService,
        private route: ActivatedRoute,
        private _dialog: DialogService,
        private navCtrl: NavController,
        private db: AngularFireDatabase,
        private actionSheetController: ActionSheetController) {
        this.messanger = new SendMessageFirebaseClass(this.db);
        this.user = queryString.parse(localStorage['user']);
        this.room_id = this.route.snapshot.params['id'];
        this.alian_id = this.route.snapshot.queryParams['member_1'];
        this.avatar = this.route.snapshot.queryParams['avatar'];
        this.name = this.route.snapshot.queryParams['name'];
        this.surname = this.route.snapshot.queryParams['surname'];
        this.messanger.readMessage(this.room_id);
        this.unread['room_id'] = this.room_id;
        this.limit$ = new BehaviorSubject(this.limit);
        this.messagesList$ = this.limit$.pipe(
            switchMap(limit =>
                db.list('chats/' + this.room_id + '/messages', ref => ref.limitToLast(limit)
                ).snapshotChanges()
            )
        );
        this.messages = this.messagesList$.pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
        this.unread[this.user['id']] = 0;
        this.messages.subscribe(() => {
            // if (this.firstLoad) {
            if (this.diferent || this.firstLoad) {
                setTimeout(() => {
                    this.content.scrollToBottom();
                }, 100);
                this.firstLoad = false;
            }
            this.diferent = 1;

            // }
        });
    }

    changeScroll(event: any) {
        if (event['detail']['scrollTop'] === 0) {
            this.diferent = 0;
            this.limit += 30;
            this.limit$.next(this.limit);
        }
    }

    async send() {
        let msg = {
            type: 'message',
            message_creator_id: Number(this.user['id']),
            message: this.message,
            date: new Date().toString(),
            room_id: Number(this.room_id),
            username: this.user['name'] + ' ' + this.user['surname'],
        };
        if (this.message.trim().length || this.fileUnload.length) {
            let load = await this.setFileAmazon();
            if (load) {
                msg['fils'] = this.fileUpload;
                this.messanger.sendMessage(this.room_id, msg, this.alian_id);
                this._dialog.sendPushNot(msg, this.alian_id).subscribe();
                this.message = '';
                this.cleareFile();
            }
        }
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 500);
    }

    async attach() {
        let that = this;
        const actionSheet = await this.actionSheetController.create({
            header: 'Виберите вариант',
            buttons: [
                {
                    text: 'Камера',
                    icon: 'camera',
                    handler: () => {
                        console.log('Камера clicked');
                        this.fileLoad = true;
                        this._file.getCam(this.camera.PictureSourceType.CAMERA).then(file => {
                            console.log(file, 'log');
                            this.fileLoad = false;
                            that.fileUnload.push(file);
                        }).catch(err => {
                            this.fileLoad = false;
                        });
                    }
                },
                {
                    text: 'Галерея',
                    icon: 'images',
                    handler: () => {
                        console.log('Галерея clicked');
                        this.fileLoad = true;
                        this._file.getCam(this.camera.PictureSourceType.PHOTOLIBRARY).then(file => {
                            console.log(file, 'log');
                            this.fileLoad = false;
                            that.fileUnload.push(file);
                        }).catch(err => {
                            this.fileLoad = false;
                        });
                    }
                },
                {
                    text: 'Файлы',
                    icon: 'document',
                    handler: () => {
                        console.log('Файл clicked');
                        this.fileLoad = true;
                        this._file.selectFiles().then(file => {
                            console.log(file, 'log');
                            this.fileLoad = false;
                            that.fileUnload.push(file);
                        }).catch(err => {
                            this.fileLoad = false;
                        });
                    }
                }, {

                    text: 'Отмена',
                    role: 'cancel',
                    handler: () => {
                        this.fileLoad = false;
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    back() {
        this.navCtrl.navigateRoot(['/app/tabs/chat']);
    }

    rmFile(index) {
        this.fileUnload.splice(index, 1);
        console.log(this.fileUnload);
    }

    setFileAmazon() {
        let that = this;
        return new Promise((resolve, reject) => {
            debugger
            let setUrlFilesToServer = [];
            if (this.fileUnload.length) {
                this.fileUnload.map((file, index) => {
                    file['loading'] = true;
                    let amazon = new SetAmazonFileClass();
                    amazon.uploadfile(file['file'], file['fileName']).then(url => {
                        debugger
                        that.fileUpload.push({ fileName: file['fileName'], fileUrl: url, fileType: file['fileType'] });
                        setUrlFilesToServer.push(url);
                        file['loading'] = false;
                        if (that.fileUpload.length === that.fileUnload.length) {
                            this._dialog.setFile(this.room_id, { files: setUrlFilesToServer }).subscribe();
                            resolve(true);
                        }
                    }).catch(err => {
                        console.log('error load file to amazon');
                        reject();
                    });
                });
            } else {
                resolve(true);
            }
        });
    }

    cleareFile() {
        this.fileUnload.map(el => {
            this._file.rmFile(el);
        });
        this.fileUnload = [];
        this.fileUpload = [];
    }

    onFocus() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 300);
    }

    onBlur() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 300);
    }
}
