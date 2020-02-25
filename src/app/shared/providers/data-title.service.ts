import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataCartService {

    private cartSource = new BehaviorSubject(localStorage['cart']);
    currentCart = this.cartSource.asObservable();

    constructor() { }

    changeCart(cart: any) {
        this.cartSource.next(cart);
    }

}