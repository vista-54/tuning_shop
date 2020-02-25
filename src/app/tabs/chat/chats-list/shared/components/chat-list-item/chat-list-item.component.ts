import { Router } from '@angular/router';
import * as queryString from 'query-string';
import { Component, Input } from '@angular/core';
import { ChatsListService } from './../../services/chats-list.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent {

  @Input('chat') private chat: any;
  @Input('loading') private loading: boolean;

  private user: object = {};

  constructor(
    private router: Router,
    private chatService: ChatsListService) { }

  delete(room_id: number, member_1: number) {
    this.user = queryString.parse(localStorage['user']);
    this.chatService.rmChat(room_id, { member_1, member_2: this.user['id'] }).subscribe(res => {
      if (res['status']) {
        this.chat = null;
      }
    });
  }

  openDialog(room_id: number, member_1: number, avatar: string, name: string, surname: string) {
    this.router.navigate(['/app/tabs/chat/dialog', room_id], { queryParams: { member_1, avatar, name, surname } });
  }
}
