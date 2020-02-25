import * as queryString from 'query-string';
import { Observable, fromEvent } from 'rxjs';
import { CartClass } from 'src/app/modals/cart';
import { ModalController } from '@ionic/angular';
import { buffer, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';
import { DataCartService } from 'src/app/shared/providers/data-title.service';
import { ShareComponent } from 'src/app/shared/components/share/share.component';
import { ChatsListService } from './../../chat/chats-list/shared/services/chats-list.service';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnInit {

  @ViewChild('count', { static: false })
  name: ElementRef;
  streamName: Observable<any>;


  private cart: any;
  private cartClass: any;
  private user: object = {};
  private entity: object = {};
  private countSelect: number;

  constructor(
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    private _chat: ChatsListService,
    private cartData: DataCartService,
    private modalController: ModalController
  ) {
    this.cartClass = new CartClass();
  }

  async ngOnInit() {
    this.entity = this.route.snapshot.data['resolve']['entity'];
    this.user = queryString.parse(localStorage['user']);
    this.cart = await this.cartClass.getItems();
    this.count();
  }

  add() {
    this.cartClass.addToCard(this.entity);
    this.toast.toast('success', 'Добавлено в корзину');
    this.cartData.changeCart(true);
    this.count();
  }

  rm(clear?: boolean) {
    clear ? this.cartClass.rmFoolCart(this.entity) : this.cartClass.rmWithCart(this.entity);
    this.toast.toast('success', 'Удалено из корзины');
    this.count();
    this.cartData.changeCart(true);
  }

  count() {
    this.countSelect = this.cartClass.getCountThisItem(this.entity);
    if (Number(this.countSelect) && this.name) {
      this.streamName = fromEvent(this.name['nativeElement'], 'keyup');
      this.streamName.pipe(buffer(this.streamName.pipe(debounceTime(500)))).forEach(() => { if (Number(this.countSelect)) this.toast.toast('success', 'Сохранено') });
    }
  }

  toggle(clear: boolean) {
    this.countSelect ? clear ? this.rm(clear) : this.rm() : this.add();
  }

  async changeCount(ev: any) {
    if (ev['target']['value'].trim().length && Number(ev['target']['value'])) {
      await this.cartClass.changeCount(this.entity, Number(ev['target']['value']));
      this.count();
      this.cartData.changeCart(3);
    } else {
      this.count();
    }
  }

  async sharePopup() {
    const modal = await this.modalController.create({
      component: ShareComponent,
      cssClass: 'shareModal',
      componentProps: { new: this.entity, type: 'shop' }
    });
    return await modal.present();
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  openDialog(member_1: number) {
    let users = { member_1, member_2: this.user['id'] };
    this._chat.create(users).subscribe(res => {
      this.router.navigate(['/app/tabs/chat/dialog', res['id']], { queryParams: { member_1 } });
    });
  }

  async openComments(itemId: number, userId: number) {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      componentProps: { typeUrl: 'product', itemId, userId }
    });
    modal.onDidDismiss().then(res => {
      this.entity['comment_count'] = res['data']['totalItems'];
    });
    return await modal.present();
  }

  back() {
    window.history.back();
  }

}
