import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class DataShopService {

    private shopSource = new BehaviorSubject({});
    currentShop = this.shopSource.asObservable();

    constructor() { }

    changeShop(shop: any) {
        this.shopSource.next(shop);
    }

}