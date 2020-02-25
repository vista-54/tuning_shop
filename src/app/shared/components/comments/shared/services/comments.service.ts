import { APP_URL } from './../../../../constants/url';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/services/entity.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Injectable()
export class CommentsService extends EntityService {

  constructor(public request: RequestService) {
    super(request);
  }

  getComments(itemId: number, url: string) {
    return this.request.get(APP_URL.comments[url] + '/' + itemId + '/comment');
  }

  setComment(data: object, url: string) {
    return this.request.post(APP_URL.setComments[url], data);
  }

  rmComment(itemId: number, url: string) {
    return this.request.delete(APP_URL.setComments[url] + '/' + itemId);
  }

}
