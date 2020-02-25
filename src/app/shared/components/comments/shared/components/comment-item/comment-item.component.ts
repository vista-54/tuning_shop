import * as queryString from 'query-string';
import { Component, Input, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {

  @Input('comment') private comment: any;
  @Input('loading') private loading: boolean;
  @Input('typeUrl') private typeUrl: string;

  @Input() totalItems: any;
  @Output() totalItemsChange = new EventEmitter();
  @Output() dismiss = new EventEmitter();

  private user: object = {};

  constructor(
    private navCtrl: NavController,
    private _comment: CommentsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = queryString.parse(localStorage['user']);
  }

  async rmComment() {
    const alert = await this.alertController.create({
      header: 'Внимание!',
      message: 'Вы действительно хотите удалить комментарий?',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Да',
          handler: () => {
            this._comment.rmComment(this.comment['id'], this.typeUrl).subscribe(res => {
              if (res['status']) {
                this.comment = null;
                this.totalItems--;
                this.totalItemsChange.emit(this.totalItems);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  openUser(id: number) {
    this.navCtrl.navigateRoot(['/app/tabs/menu/user', id]);
    this.dismiss.emit();
  }

}
