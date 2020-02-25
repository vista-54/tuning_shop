import { ChatsListService } from 'src/app/tabs/chat/chats-list/shared/services/chats-list.service';
import { ColleguesService } from './shared/services/collegues.service';
import { CollegueItemComponent } from './shared/components/collegue-item/collegue-item.component';
import { ColleguesComponent } from './collegues.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { RouterModule } from '@angular/router';
import { OwlRatingModule } from 'owl-ng';
import { FilterCollegueModule } from 'src/app/shared/components/filter-collegue/filter-collegue.module';

@NgModule({
  declarations: [
    ColleguesComponent,
    CollegueItemComponent
  ],
  imports: [
    IonicModule,
    SharedModule,
    MoveModule,
    OwlRatingModule,
    FilterCollegueModule,
    RouterModule.forChild([{
      path: '',
      component: ColleguesComponent,
      resolve: {
        resolve: ColleguesService
      }
    }])
  ],
  providers: [ColleguesService, ChatsListService]
})
export class ColleguesModule { }
