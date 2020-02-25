import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {

  @Input('url') private url: string;
  @Input('name') private name: string;
  @Input('type') private type: string;

  constructor(private modalController: ModalController) { }

}
