import { DirectiveModule } from './../../../shared/directives/directive.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataShopService } from 'src/app/shared/providers/data-shop.service';
import { ShopFilterModule } from './../../../shared/components/shop-filter/shop-filter.module';
import { ChatsListService } from '../../chat/chats-list/shared/services/chats-list.service';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    IonicModule,
    SharedModule,
    DirectiveModule,
    ShopFilterModule,
    ShopRoutingModule
  ],
  providers: [DataShopService, ChatsListService]
})
export class ShopModule { }
