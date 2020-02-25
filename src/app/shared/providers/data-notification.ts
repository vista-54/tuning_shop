import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataNotificationService {

    private notificationSource = new BehaviorSubject(0);
    currentNotification = this.notificationSource.asObservable();

    changeNotification(notification: any) {
        this.notificationSource.next(notification);
    }

}