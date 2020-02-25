import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-collegue',
  templateUrl: './filter-collegue.component.html',
  styleUrls: ['./filter-collegue.component.scss'],
})
export class FilterCollegueComponent {

  @Input('specializations') private specializations: Array<object>;
  @Input('params') private params: object;
  public checked: boolean = false;
  // public filter: object = {
  //   verified: 'all',
  //   certified: 'all'
  // };
  private filter: FormGroup;
  private checkedMaster: boolean = false;

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {
    this.filter = fb.group({
      role_id: new FormControl(''),
      city: new FormControl(''),
      specialization: new FormControl([]),
      sort: new FormControl(''),
      certified: new FormControl('all'),
      verified: new FormControl('all'),
    });
  }

  ngAfterViewInit() {
    if (this.params['role_id'] == 3) {
      this.checkedMaster = true;
    }
    this.filter.patchValue(this.params);
  }

  selectSort(ev: any) {
    this.filter.patchValue({ sort: ev.target['value'] });
  }

  selectRole(ev: any) {
    this.filter.patchValue({ ['role_id']: ev.target['value'] });
    if (this.filter['value']['role_id'] == 3) {
      this.checkedMaster = true;
    } else {
      this.checkedMaster = false;
      this.filter.patchValue({ 'specialization': null });
    }
  }

  selectCertificate(ev: any) {
    this.filter.patchValue({ certified: ev.target['value'] });
  }

  selectVerifired(ev: any) {
    this.filter.patchValue({ verified: ev.target['value'] });
  }

  clear() {
    this.filter.reset();
  }

  filteFrom() {
    this.modalController.dismiss(this.filter.value);
  }

}
