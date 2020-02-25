import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DataShopService } from 'src/app/shared/providers/data-shop.service';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';
import { ShopFilterComponent } from 'src/app/shared/components/shop-filter/shop-filter.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  @ViewChild('sliders', { static: false }) private sliders: any;
  private id: number;
  private slideOpts: any;
  private params: object = {};
  private previouslyFilter: any;
  private loader: boolean = true;
  private refresh: boolean;
  private providers: Array<object> = [];
  private categories: Array<object> = [
    { id: 1, show: true, title: 'Винил' },
    { id: 2, show: true, title: 'Защита' },
    { id: 3, show: true, title: 'Тонировка' },
    // { id: 4, show: false, title: 'Детейлинг'},
    { id: 5, show: true, title: 'Инструменты' },
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private shopData: DataShopService,
    private modalController: ModalController
  ) {
    this.id = this.route.snapshot.firstChild.params['id'];
    this.slideOpts = {
      zoom: false,
      slidesPerView: 3,
    };
  }

  ngOnInit() {
    this.openFilter();
  }

  changeCategory(categoryId: number) {
    this.id = categoryId;
    this.navCtrl.navigateRoot(['app/tabs/menu/shop/list', categoryId]);
    this.openFilter();
  }

  changeSearch(ev: any) {
    this.params['name'] = ev.target['value'];
    this.params['page'] = 1;
    this.refresh = true;
    this.shopData.changeShop({ params: this.params, refresh: this.refresh, loader: this.loader });
  }

  getTitle() {
    let x = this.categories.findIndex(el => el['id'] == this.id);
    return this.categories[x]['title'];
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  async openFilter() {
    const modal = await this.modalController.create({
      component: ShopFilterComponent,
      componentProps: { id: this.id, params: this.params },
      cssClass: 'selectModal'
    });
    modal.onDidDismiss().then(filter => {
      if (filter != null && this.previouslyFilter !== filter['data']) {
        if (filter['data'] && filter['data']['provider_id'] === 'all') filter['data']['provider_id'] = null;
        Object.assign(this.params, filter['data']);
        this.previouslyFilter = filter['data'];
        this.refresh = true;
        this.params['page'] = 1;
        this.shopData.changeShop({ params: this.params, refresh: this.refresh, loader: this.loader });
      }
    });
    return await modal.present();
  }
}
