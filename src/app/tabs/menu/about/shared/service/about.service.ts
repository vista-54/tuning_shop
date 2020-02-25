import { APP_URL } from './../../../../../shared/constants/url';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class AboutService implements Resolve<any> {

  constructor(private request: RequestService) { }

  resolve() {
    return this.get();
  }

  get() {
    return this.request.get(APP_URL.about.index);
  }
}
