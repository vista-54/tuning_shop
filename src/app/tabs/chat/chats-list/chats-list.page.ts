import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ChatsListService } from "./shared/services/chats-list.service";
import { InfinityScroll } from 'src/app/shared/components/infinity-scroll';
import * as queryString from 'query-string';
// import { Observable } from 'rxjs';

@Component({
    selector: 'page-chats-list',
    templateUrl: './chats-list.page.html',
    styleUrls: ['./chats-list.page.scss']
})
export class ChatsListPage extends InfinityScroll {

    @ViewChild('content', { static: false }) private content: any;
    private user: object;
    // private stream: Observable<any>;
    public loading = true;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public changeDetector: ChangeDetectorRef,
        public chatService: ChatsListService) {
        super(chatService, changeDetector);
    }

    async ionViewWillEnter() {
        this.user = queryString.parse(localStorage['user']);
        this.route.data.forEach(res => {
            this.toItems = res['resolve']['entity']['to'];
            this.list = res['resolve']['entity']['data'];
            this.currentPage = res['resolve']['entity']['current_page'];
            this.totalItems = res['resolve']['entity']['total'];
            this.loading = false;
        });
    }

    changeSearch($event: any) {
        this.list = [];
        this.params['name'] = $event['target']['value'];
        this.getAll();
    }
}
