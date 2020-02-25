import { ShopFilterService } from './shared/services/shop-filter.service';
import { Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss'],
})
export class ShopFilterComponent implements OnInit, AfterViewInit {

  @Input('id') private id: any;
  @Input('params') private params: object;

  private providers: Array<object>;

  private filter: FormGroup;

  constructor(
    private _shop: ShopFilterService,
    private modalController: ModalController,
    fb: FormBuilder) {
    this.filter = fb.group({
      provider_id: new FormControl(null, Validators.required),
      action: new FormControl(null),
      new: new FormControl(null),
      sort: new FormControl(null)
    });
  }

  ngOnInit() {
    this._shop.get(this.id).subscribe(res => {
      this.providers = res['entity'];
      let providers = this.providers.filter(el => el['id'] === this.filter.value['provider_id']);
      if (!providers.length) this.filter.patchValue({ provider_id: null });
    });
  }

  ngAfterViewInit() {
    this.filter.patchValue(this.params);
  }

  selectProvider(ev: any) {
    this.filter.patchValue({ provider_id: ev.target['value'] });
  }

  selectAction(ev: any) {
    this.filter.patchValue({ action: ev.target['value'] });
  }

  selectNew(ev: any) {
    this.filter.patchValue({ new: ev.target['value'] });
  }

  selectSort(ev: any) {
    this.filter.patchValue({ sort: ev.target['value'] });
  }

  clear() {
    this.filter.reset();
  }

  filteFrom() {
    this.modalController.dismiss(this.filter.value);
  }

}
