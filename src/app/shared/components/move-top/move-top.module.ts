import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { MoveTopComponent } from './move-top.component';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        DirectiveModule
    ],
    declarations: [MoveTopComponent],
    exports: [MoveTopComponent]
})
export class MoveModule { }