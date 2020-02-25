import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from './shared/services/news.service';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import * as queryString from 'query-string';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent extends InfinityScroll {

  @ViewChild('content', { static: false }) private content: any;

  public loading = true;
  private user: object = {};

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController, public changeDetector: ChangeDetectorRef,
    public newsService: NewsService) {
    super(newsService, changeDetector);
  }

  async ionViewWillEnter() {
    this.user = queryString.parse(localStorage['user']);
    this.id = this.user['id'];
    this.route.data.forEach(data => {
      this.toItems = data['resolve']['entity']['to'];
      this.list = data['resolve']['entity']['data'];
      this.params['page'] = data['resolve']['entity']['current_page'];
      this.totalItems = data['resolve']['entity']['total'];
      this.loading = false;
    });
  }

  createNews() {
    this.navCtrl.navigateRoot(['app/tabs/news/create']);
  }
}

