import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { ShopFilterComponent } from './shop-filter.component';
import { ShopFilterService } from './shared/services/shop-filter.service';

@NgModule({
  declarations: [ShopFilterComponent],
  imports: [
    IonicModule,
    SharedModule
  ],
  providers: [ShopFilterService],
  entryComponents: [ShopFilterComponent]
})
export class ShopFilterModule { }
