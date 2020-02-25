import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SupportService } from './shared/services/support.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {

  private support: FormGroup;

  constructor(
    private _support: SupportService,
    fb: FormBuilder
  ) {
    this.support = fb.group({
      theme: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  supportForm() {
    this._support.setSupport(this.support.value).subscribe(res => {
      if (res['status']) {
        this.support.reset();
      }
    });
  }

}
