import { Platform } from '@ionic/angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-move-top',
  templateUrl: './move-top.component.html',
  styleUrls: ['./move-top.component.scss'],
})
export class MoveTopComponent {

  ios;

  constructor(private platform: Platform) {
    this.ios = this.platform.is('ios');
  }
}
