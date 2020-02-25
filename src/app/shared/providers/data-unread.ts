import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class DataUnreadCountService {

    private unreadCountSource = new BehaviorSubject(null);
    currentUnreadCount = this.unreadCountSource.asObservable();

    constructor() { }

    changeUnreadCount(unreadCount: any) {
        this.unreadCountSource.next(unreadCount);
    }

}