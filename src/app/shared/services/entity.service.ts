import { RequestService } from '../services/request.service';
import { Injectable } from '@angular/core';
import { Entity } from '../interfaces/entity.interface';


@Injectable()

export class EntityService implements Entity {

    public url: string;

    constructor(public request: RequestService) { }

    get(id: number = null, data: object = null, customUrl: string = null, loader: boolean = true) {
        let url = customUrl || this.url;
        if (id != null) {
            url += '/' + id;
        }
        return this.request.get(url, data, loader);
    }

    create(data: any, customUrl: string = null, loader: boolean = false) {
        let url = customUrl || this.url;
        return this.request.post(url, data, loader);
    }

    edit(data: any, customUrl: string = null, loader: boolean = false) {
        let url = customUrl || this.url;
        if (data.id != null) {
            url += '/' + data.id;
        }
        return this.request.put(url, data, loader);
    }

    deleteOnce(data, customUrl: string = null, loader: boolean = false) {
        let url = customUrl || this.url;
        if (data.id != null) {
            url += '/' + data.id;
        }
        return this.request.delete(url, null, loader);
    }


    delete(data: any, customUrl: string = null, loader: boolean = false) {
        let url = customUrl || this.url;
        if (data.id != null) {
            url += '/' + data.id;
        }
        return this.request.post(url, data, loader);
    }


    update(data: any, customUrl: string = null, loader: boolean = false) {
        let url = customUrl || this.url;
        if (data.id != null) {
            url += '/' + data.id;
        }
        return this.request.put(url, data, loader);
    }
}
