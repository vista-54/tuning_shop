import { Platform } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {

  @Input('item') private item: any;
  @Input('loading') private loading: boolean;

  private user: object = {};

  constructor(
    private router: Router,
    private platform: Platform) { }

  getWidth() {
    let width = this.platform.width() * 0.46;
    return width;
  }

  getHeight() {
    let height = (this.platform.width() * 0.46) / 1.25;
    return height;
  }

  itemInfo(id: number) {
    this.router.navigate(['/app/tabs/menu/item', id]);
  }
}
