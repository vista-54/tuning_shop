import { ChatsListService } from './../../chat/chats-list/shared/services/chats-list.service';
import { ModalController, NavController } from '@ionic/angular';
import * as queryString from 'query-string';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import { OpenInstagram } from 'src/app/shared/components/open-instagram.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends InfinityScroll implements OnInit {

  @ViewChild('content', { static: false }) private content: any;

  private alians;
  public loading = true;
  private user: object = {};
  private collegue;

  constructor(
    private router: Router,
    public _user: UserService,
    private route: ActivatedRoute,
    private opeInst: OpenInstagram,
    private _chat: ChatsListService,
    private navCtrl: NavController,
    private modalController: ModalController,
    public changeDetector: ChangeDetectorRef
  ) {
    super(_user, changeDetector);
  }

  ngOnInit() {
    this.user = queryString.parse(localStorage['user']);
    this.collegue = this.route.snapshot.queryParams['collegue'];
    this.route.data.forEach(data => {
      this.alians = data['resolve'][0]['entity'];
      this.id = this.alians['id'];
      this.toItems = data['resolve'][1]['entity']['to'];
      this.list = data['resolve'][1]['entity']['data'];
      this.params['page'] = data['resolve'][1]['entity']['current_page'];
      this.totalItems = data['resolve'][1]['entity']['total'];
      this.loading = false;
    });
  }


  back() {
    if (this.collegue === 'collegue') {
      this.navCtrl.navigateRoot('/app/tabs/menu/collegues');
    } else {
      window.history.back();
    }
  }

  openInst() {
    this.opeInst.openInst(this.user['instagram']);
  }

  openVK(vk: string) {
    this.opeInst.openVK(vk);
  }

  subs(userId: number) {
    if (!this.alians['subscribe']) {
      this._user.subs(userId).subscribe(res => {
        if (res['status']) {
          this.alians['subscribe'] = true;
        }
      });
    } else {
      this._user.unsub(userId).subscribe(res => {
        if (res['status']) {
          this.alians['subscribe'] = false;
        }
      });
    }
  }

  openDialog(member_1: number, avatar: string, name: string, surname: string) {
    let users = { member_1, member_2: this.user['id'] };
    this._chat.create(users).subscribe(res => {
      this.router.navigate(['/app/tabs/chat/dialog', res['id']], { queryParams: { member_1, avatar, name, surname } });
    });
  }

  async openComments(userId: number) {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      componentProps: { typeUrl: 'user', itemId: userId, userId: this.alians['id'], permission: this.user['permission'], com: false }
    });
    modal.onDidDismiss().then(res => {
      this.alians['comment_count'] = res['data']['totalItems'];
    });
    return await modal.present();
  }
}
