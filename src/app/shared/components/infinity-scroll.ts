import { Injectable, ChangeDetectorRef } from "@angular/core";
import { EntityService } from '../services/entity.service';

@Injectable()
export class InfinityScroll {

    public id: number;
    public url: string;
    public moveTop: any;
    public toItems: number;
    public list: any[] = [];
    public refresh: boolean;
    public totalItems: number;
    public params: object = {};
    public currentPage: number;
    public itemsPerPage: number;
    public customUrl: any = null;
    public loader: boolean = false;
    public loading: boolean = true;
    public display: string = 'none';

    constructor(public service: EntityService, public changeDetector: ChangeDetectorRef) {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.params = { page: this.currentPage, limit: this.itemsPerPage };
    }

    getAll() {
        // this.changeDetector.detach();
        for (let param in this.params) {
            if (!this.params[param] || (typeof this.params[param] === 'string' && !this.params[param].trim().length)) {
                delete this.params[param];
            }
        }
        this.service.get(this.id, this.params, this.customUrl, this.loader)
            .subscribe(success => {
                if (this.refresh) this.list = [];
                this.list = this.list.concat(success['entity']['data']);
                this.params['page'] = success['entity']['current_page'];
                this.totalItems = success['entity']['total'];
                this.toItems = success['entity']['to'];
                this.loading = this.refresh = false;
                this.loader = false;
                // this.changeDetector.reattach();
                console.log(this.list);
            });
    }

    loadData(event) {
        setTimeout(() => {
            this.params['page']++;
            if (this.toItems == this.totalItems) {
                this.params['page']--;
            } else {
                this.getAll();
            }
            event.target.complete();
        }, 500);
    }

    logScrolling(ev) {
        if (ev['detail']['scrollTop'] > 100) {
            this.display = "block";
        } else {
            this.display = "none";
        }
    }

    doRefresh(event) {
        this.refresh = this.loading = true;
        this.list = Array(this.list.length);
        setTimeout(() => {
            this.params['page'] = 1;
            this.getAll();
            event.target.complete();
        }, 1000);
    }
}