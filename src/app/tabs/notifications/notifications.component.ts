import { InfinityScroll } from './../../shared/components/infinity-scroll';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent extends InfinityScroll {

  @ViewChild('content', { static: false }) private content: any;
  display;

  constructor(
    private route: ActivatedRoute,
    public _notification: NotificationService, public changeDetector: ChangeDetectorRef) {
    super(_notification, changeDetector);
    this.loading = true;
    this.list = Array(10);
  }

  ionViewWillEnter() {
    this.route.data.forEach(data => {
      this.toItems = data['resolve'][0]['entity']['to'];
      this.list = data['resolve'][0]['entity']['data'];
      this.params['page'] = data['resolve'][0]['entity']['current_page'];
      this.totalItems = data['resolve'][0]['entity']['total'];
      this.loading = false;
    });
  }
}
