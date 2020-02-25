import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { TabsRoutingModule } from './tabs.router.module';
import { FirebaseModule } from './../shared/firebase.module';
import { DataCartService } from '../shared/providers/data-title.service';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { DataUnreadCountService } from '../shared/providers/data-unread';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    FirebaseModule,
    DirectiveModule,
    TabsRoutingModule
  ],
  declarations: [
    TabsPage
  ],
  providers: [
    DataCartService,
    DataUnreadCountService
  ]
})
export class TabsPageModule { }
