import {Observable} from 'rxjs';

export declare interface Entity {
    get(data: any): Observable<object>;

    create(data: any): Observable<object>;

    update(data: any): Observable<object>;

    delete(data: any): Observable<object>;
}
