import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TargetLocator } from 'selenium-webdriver';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

  private title: string;
  private target: any;

  constructor(private route: ActivatedRoute) { }

  ionViewWillEnter() {
    this.route.data.forEach(res => {
      this.title = res['resolve']['entity']['title'];
      this.target = document.querySelector('#content_div');
      let div = document.createElement('div');
      div.innerHTML = res['resolve']['entity']['text'];
      this.target.parentNode.insertBefore(div, this.target);
      this.target.parentNode.insertBefore(div, this.target.nextSibling);
    });
  }

  ionViewDidLeave() {
    this.target.parentNode.removeChild(this.target);

  }

}
