import { DirectiveModule } from './../../shared/directives/directive.module';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationService } from './shared/services/notification.service';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { SelectPopupModule } from 'src/app/shared/components/select-popup/select-popup.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    MoveModule,
    IonicModule,
    SharedModule,
    MomentModule,
    ComponentModule,
    DirectiveModule,
    SelectPopupModule,
    RouterModule.forChild([{
      path: '', component: NotificationsComponent,
      resolve: {
        resolve: NotificationService
      }
    }])
  ],
  providers: [NotificationService]
})
export class NotificationsModule { }
