import { IonicModule } from '@ionic/angular';
import { SelectPopupComponent } from './select-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { NewsService } from 'src/app/tabs/news/shared/services/news.service';

@NgModule({
  declarations: [
    SelectPopupComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ShareModule,
  ],
  providers: [NewsService],
  entryComponents: [SelectPopupComponent]
})
export class SelectPopupModule { }
