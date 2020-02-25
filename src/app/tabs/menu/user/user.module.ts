import { OwlRatingModule } from 'owl-ng';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from './shared/services/user.service';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { SelectPopupModule } from 'src/app/shared/components/select-popup/select-popup.module';
import { CommentsModule } from 'src/app/shared/components/comments/comments.module';
import { ChatsListService } from '../../chat/chats-list/shared/services/chats-list.service';

@NgModule({
  declarations: [UserComponent],
  imports: [
    MoveModule,
    IonicModule,
    SharedModule,
    CommentsModule,
    ComponentModule,
    OwlRatingModule,
    SelectPopupModule
  ],
  providers: [UserService, ChatsListService]
})
export class UserModule { }
