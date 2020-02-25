import { ListItemComponent } from '../../../shared/components/list-item/list-item.component';
import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListService } from './shared/services/list.service';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    MoveModule,
    IonicModule,
    SharedModule,
    ComponentModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent,
      resolve: {
        resolve: ListService
      }
    }])
  ],
  providers: [ListService]
})
export class ListModule { }
