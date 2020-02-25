import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { FilterCollegueComponent } from './filter-collegue.component';

@NgModule({
  declarations: [FilterCollegueComponent],
  imports: [
    IonicModule,
    SharedModule
  ],
  entryComponents: [FilterCollegueComponent]
})
export class FilterCollegueModule { }
