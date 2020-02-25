import * as queryString from 'query-string';
import { ModalController } from '@ionic/angular';
import { CommentsService } from './shared/services/comments.service';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import { APP_URL } from '../../constants/url';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent extends InfinityScroll implements AfterViewInit {

  @ViewChild('content', { static: false }) private content: any;

  @Input('com') private com: boolean = true;
  @Input('itemId') private itemId: number;
  @Input('userId') private userId: number;
  @Input('typeUrl') private typeUrl: string;
  @Input('permission') private permission: boolean = true;

  public loading = true;
  private user: object = {};
  private totalItem: number;
  private message: object = {};

  constructor(
    private _comments: CommentsService,
    private modalController: ModalController,
    public changeDetector: ChangeDetectorRef
  ) {
    super(_comments, changeDetector);
    this.user = queryString.parse(localStorage['user']);
  }

  ngAfterViewInit() {
    this.customUrl = APP_URL.comments[this.typeUrl] + '/' + this.itemId + '/comment';
    this._comments.getComments(this.itemId, this.typeUrl).subscribe(data => {
      this.toItems = data['entity']['to'];
      this.list = data['entity']['data'];
      this.params['page'] = data['entity']['current_page'];
      this.totalItems = data['entity']['total'];
      this.loading = false;
    });
  }

  send() {
    this.message['news_id'] = this.itemId;
    if (!this.message['rating']) delete this.message['rating'];
    if (this.typeUrl === 'user') this.message['target_id'] = this.itemId;
    this._comments.setComment(this.message, this.typeUrl).subscribe(res => {
      if (res['status']) {
        this.params['page'] = 1;
        this.message = {};
        this.refresh = true;
        this.getAll();
      }
    });
  }
}
