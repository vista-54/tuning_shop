import { Directive, AfterViewInit, Output } from '@angular/core';
import { DataCartService } from '../providers/data-title.service';

@Directive({
  selector: '[appCartCount]',
  exportAs: 'sumSelectCount'
})
export class CartCountDirective implements AfterViewInit {

  @Output('sumSelectCount') sumSelectCount: number = 0;

  private sum;
  private cart;
  private selectCount;

  constructor(
    private cartData: DataCartService
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cartData.currentCart.subscribe(() => {
        this.sortCart();
      });
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
      this.sumSelectCount = 0;
    }
  }

}
