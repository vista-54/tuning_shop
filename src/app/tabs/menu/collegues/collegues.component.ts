import { ModalController } from '@ionic/angular';
import { APP_URL } from 'src/app/shared/constants/url';
import { ActivatedRoute } from '@angular/router';
import { ColleguesService } from './shared/services/collegues.service';
import { Component, OnInit, ViewChild, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import { FilterCollegueComponent } from 'src/app/shared/components/filter-collegue/filter-collegue.component';

@Component({
  selector: 'app-collegues',
  templateUrl: './collegues.component.html',
  styleUrls: ['./collegues.component.scss'],
})
export class ColleguesComponent extends InfinityScroll implements OnInit, AfterViewInit {

  @ViewChild('content', { static: false }) private content: any;
  public loading = true;

  private specializations: Array<object>;
  private previouslyFilter: any;
  private selectPage: string;
  constructor(
    private ngZone: NgZone,
    private modalController: ModalController,
    private route: ActivatedRoute,
    public changeDetector: ChangeDetectorRef,
    public _collegues: ColleguesService) {
    super(_collegues, changeDetector);
  }

  ngOnInit() {
    this.route.data.forEach(res => {
      this.toItems = res['resolve'][0]['entity']['to'];
      this.list = res['resolve'][0]['entity']['data'];
      this.currentPage = res['resolve'][0]['entity']['current_page'];
      this.totalItems = res['resolve'][0]['entity']['total'];
      this.loading = false;
      this.specializations = res['resolve'][1]['entity'];
      this.selectPage = 'all';
      this.customUrl = APP_URL.collegues[this.selectPage];
    });
  }

  ngAfterViewInit() {
    // this.ngZoneDetect();
  }

  segmentChanged(ev?: any, name?: string) {
    console.log(ev);
    this.selectPage = ev;
    this.customUrl = APP_URL.collegues[ev];
    this.params['page'] = 1;
    this.refresh = true;
    this.loader = true;
    // this.ngZoneDetect();
    this.getAll();
  }

  changeSearch(ev: any) {
    console.log(ev.target['value']);
    this.params['name'] = ev.target['value'];
    this.params['page'] = 1;
    this.refresh = true;
    // this.loader = true;
    // this.ngZoneDetect();
    this.getAll();
  }

  async filter() {
    const modal = await this.modalController.create({
      component: FilterCollegueComponent,
      componentProps: { specializations: this.specializations, params: this.params },
      cssClass: 'selectModal'
    });
    modal.onDidDismiss().then(filter => {
      if (filter != null && this.previouslyFilter !== filter['data']) {
        Object.assign(this.params, filter['data']);
        this.previouslyFilter = filter['data'];
        this.params['page'] = 1;
        this.refresh = true;
        this.loader = true;
        // this.ngZoneDetect();
        this.getAll();
      }
    });
    return await modal.present();
  }

  back() {
    window.history.back();
  }

  ngZoneDetect() {
    if (!NgZone.isInAngularZone()) {
      this.ngZone.run(() => {
        console.warn(NgZone.isInAngularZone()); // true
      });
    }
  }

}
