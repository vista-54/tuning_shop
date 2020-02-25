import { ShopItemComponent } from './shop-item/shop-item.component';
import { MomentModule } from 'angular2-moment';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { SharedModule } from '../shared.module';
import { NewsItemComponent } from './news-item/news-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/shared/components/cart-item/cart-item.component';
import { CartService } from './cart/shared/services/cart.service';
import { CommentsModule } from './comments/comments.module';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        MomentModule,
        CommentsModule
    ],
    declarations: [
        CartComponent,
        NewsItemComponent,
        ListItemComponent,
        ShopItemComponent,
        CartItemComponent,
        NotificationItemComponent
    ],
    exports: [
        CartComponent,
        NewsItemComponent,
        ListItemComponent,
        ShopItemComponent,
        NotificationItemComponent],
    entryComponents: [CartComponent],
    providers: [CartService]
})
export class ComponentModule { }