import { FirebaseModule } from 'src/app/shared/firebase.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ShareComponent } from './share.component';
import { ColleguesService } from 'src/app/tabs/menu/collegues/shared/services/collegues.service';
import { SharedModule } from '../../shared.module';
import { ChatsListService } from 'src/app/tabs/chat/chats-list/shared/services/chats-list.service';

@NgModule({
  imports: [IonicModule, SharedModule, FirebaseModule],
  declarations: [ShareComponent],
  providers: [ColleguesService, ChatsListService],
  entryComponents: [ShareComponent]
})
export class ShareModule { }
