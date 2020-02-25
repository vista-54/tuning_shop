import { CartClass } from './../../../modals/cart';
import { ModalController, Events } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './shared/services/cart.service';
import { DataCartService } from '../../providers/data-title.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {

  private sum;
  private start;
  private comment;
  private cartClass;
  private selectCount;
  private sumSelectCount;
  private cart: Array<object> = [];

  constructor(
    private event: Events,
    private _cart: CartService,
    private cartData: DataCartService,
    private modalController: ModalController) {
    this.cartClass = new CartClass();
  }

  ngOnInit() {

    this.cart = JSON.parse(localStorage['cart']);
    this.subCartCount();
  }

  ngOnDestroy() {
    this.event.unsubscribe('cart');
  }

  back() {
    this.modalController.dismiss();
  }

  subCartCount() {
    let currentCart = this.cartData.currentCart.subscribe(is => {
      this.sortCart();
    });
  }

  sortCart() {
    this.sum = 0;
    this.sumSelectCount = 0;
    this.cart = JSON.parse(localStorage['cart']);
    for (let i = 0; i < this.cart.length; i++) {
      let price = this.cart[i]['price'];
      this.selectCount = this.cart[i]['selectCount'];
      for (let j = 0; j < this.selectCount; j++) {
        if (isNaN(+price) && this.cart[i]['action']) {
          let x = price.indexOf(' ');
          this.sum += +price.substr(0, x);
        } else {
          this.sum += +price;
        }
        this.sum = parseFloat(this.sum.toFixed(2));
        this.sumSelectCount++;
      }
    }
    if (!this.cart.length) {
      this.sum = 0;
    }
  }

  buy() {
    this._cart.buy({ cart: this.cart, comment: this.comment }).subscribe(res => {
      if (res['status']) {
        this.cartClass.clear();
        this.sortCart();
      }
    });
  }

}
