import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { ChatRoutingModule } from "./chat-routing.module";
import { DialogModule } from "./dialog/dialog.module";
import { ChatsListService } from "./chats-list/shared/services/chats-list.service";
import { ChatsListPage } from "./chats-list/chats-list.page";
import { ChatPage } from "./chat.component";
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ChatListItemComponent } from './chats-list/shared/components/chat-list-item/chat-list-item.component';
// import { UnreadDirective } from "./chats-list/shared/directives/unread.directive";

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        ChatRoutingModule,
        DialogModule,
        MoveModule,
        DirectiveModule
    ],
    declarations: [
        ChatPage,
        ChatsListPage,
        ChatListItemComponent
        // UnreadDirective
    ],
    providers: [
        ChatsListService],
    entryComponents: [ChatListItemComponent]
})
export class ChatModule { }