import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSetFileService {

    private fileSource = new BehaviorSubject(0);
    currentFile = this.fileSource.asObservable();

    changeFile(file: any) {
        this.fileSource.next(file);
    }

}