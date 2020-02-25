import { DataShopService } from './../../../shared/providers/data-shop.service';
import { ListService } from './shared/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends InfinityScroll implements OnInit {

  @ViewChild('content', { static: false }) private content: any;
  public loading = true;

  constructor(
    public _list: ListService,
    private route: ActivatedRoute,
    private shopData: DataShopService,
    public changeDetector: ChangeDetectorRef

  ) {
    super(_list, changeDetector);
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.route.data.forEach(data => {
      this.toItems = data['resolve']['entity']['to'];
      this.list = data['resolve']['entity']['data'];
      this.params['page'] = data['resolve']['entity']['current_page'];
      this.totalItems = data['resolve']['entity']['total'];
      this.loading = false;
      console.log(this.list);
    });
    this.shopData.currentShop.subscribe(object => {
      debugger
      Object.assign(this.params, object['params']);
      this.refresh = object['refresh'];
      this.loader = object['loader'];
      this.getAll();
    });
  }

}
