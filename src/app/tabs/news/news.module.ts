import { ComponentModule } from 'src/app/shared/components/component.module';
import { Camera } from '@ionic-native/camera/ngx';
import { MomentModule } from 'angular2-moment';
import { CreateComponent } from './create/create.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NewsComponent } from './news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsService } from './shared/services/news.service';
import { ShareModule } from 'src/app/shared/components/share/share.module';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { SelectPopupModule } from 'src/app/shared/components/select-popup/select-popup.module';

@NgModule({
  declarations: [
    NewsComponent,
    CreateComponent
  ],
  imports: [
    MoveModule,
    IonicModule,
    ShareModule,
    SharedModule,
    MomentModule,
    DirectiveModule,
    ComponentModule,
    SelectPopupModule,
    NewsRoutingModule
  ],
  providers: [
    Camera,
    NewsService
  ]
})
export class NewsModule { }
