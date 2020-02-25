import { DataCartService } from 'src/app/shared/providers/data-title.service';
import { Component, OnInit, Input } from '@angular/core';
import { CartClass } from 'src/app/modals/cart';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

  @Input('item') private item: any;
  private cart: any;
  private cartClass: any;
  private countSelect: number;

  constructor(
    private event: Events,
    private cartData: DataCartService
  ) {
    this.cartClass = new CartClass();
  }

  async ngOnInit() {
    this.cart = await this.cartClass.getItems();
    this.count();
  }

  add() {
    this.cartClass.addToCard(this.item);
    this.count();
    this.cartData.changeCart(1);
  }

  rm(clear?: boolean) {
    clear ? this.cartClass.rmFoolCart(this.item) : this.cartClass.rmWithCart(this.item);
    this.count();
    this.cartData.changeCart(2);
  }

  count() {
    this.countSelect = this.cartClass.getCountThisItem(this.item);
  }

  async changeCount(ev: any) {
    if (ev['target']['value'].trim().length && Number(ev['target']['value'])) {
      await this.cartClass.changeCount(this.item, Number(ev['target']['value']));
      this.count();
      this.cartData.changeCart(3);
    } else {
      this.count();
    }
  }
}
