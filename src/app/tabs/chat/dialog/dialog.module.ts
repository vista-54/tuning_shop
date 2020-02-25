import { NgModule } from '@angular/core';
import { DialogPage } from './dialog.page';
import { IonicModule } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { MomentModule } from 'angular2-moment';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FirebaseModule } from 'src/app/shared/firebase.module';
import { DialogService } from './shared/services/dialog.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileService } from 'src/app/shared/services/file.service';
import { DataSetFileService } from './shared/providers/data-set-file';
import { VideoComponent } from './shared/components/video/video.component';
import { ComponentModule } from './../../../shared/components/component.module';
import { DirectiveModule } from './../../../shared/directives/directive.module';
import { ChatFileComponent } from './shared/components/chat-file/chat-file.component';
import { TextareaDialogDirective } from "./shared/directives/textarea-dialog.directive";

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        MomentModule,
        FirebaseModule,
        ComponentModule,
        DirectiveModule
    ],
    declarations: [
        DialogPage,
        VideoComponent,
        ChatFileComponent,
        TextareaDialogDirective
    ],
    providers: [
        File,
        FileOpener,
        FileService,
        PhotoViewer,
        FileTransfer,
        DialogService,
        DocumentViewer,
        DataSetFileService
    ],
    entryComponents: [VideoComponent]
})
export class DialogModule {
}
