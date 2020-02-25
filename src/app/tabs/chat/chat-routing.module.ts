import { ChatsListService } from './chats-list/shared/services/chats-list.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatsListPage } from './chats-list/chats-list.page';
import { DialogPage } from './dialog/dialog.page';
import { DialogService } from "./dialog/shared/services/dialog.service";

const routes: Routes = [
    {
        path: '', redirectTo: 'chat-list', pathMatch: 'full'
    },
    {
        path: 'chat-list',
        component: ChatsListPage,
        resolve: {
            resolve: ChatsListService
        }
    },
    {
        path: 'dialog/:id',
        component: DialogPage,
        resolve: {
            data: DialogService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}
