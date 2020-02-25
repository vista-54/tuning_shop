import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  private categories: Array<object> = [
    { id: 1, show: true, title: 'Винил', image: '../../../../assets/img/vinil.png' },
    { id: 2, show: true, title: 'Защита', image: '../../../../assets/img/Guard.png' },
    { id: 3, show: true, title: 'Тонировка', image: '../../../../assets/img/training.png' },
    // { id: 4, show: false, title: 'Детейлинг', image: '../../../../assets/img/detale.png' },
    { id: 5, show: true, title: 'Инструменты', image: '../../../../assets/img/equipt.png' },
  ];

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  open(categoryId: number) {
    this.navCtrl.navigateRoot(['app/tabs/menu/shop/list', categoryId]);
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

}
