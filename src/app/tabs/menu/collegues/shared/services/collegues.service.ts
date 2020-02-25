import { APP_URL } from './../../../../../shared/constants/url';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/services/entity.service';
import { Resolve } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { concat } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Injectable()
export class ColleguesService extends EntityService implements Resolve<any> {

  constructor(public request: RequestService) {
    super(request);
  }

  resolve() {

    const specialization = this.get(null, null, APP_URL['filter-collegues']['index']);
    const collegues = this.get(null, null, APP_URL.collegues.all);

    return new Promise(resolve => {
      concat(collegues, specialization)
        .pipe(toArray())
        .subscribe(x => {
          resolve(x);
        });
    });
  }
}
