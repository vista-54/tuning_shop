import { DirectiveModule } from './../../shared/directives/directive.module';
import { ClaimService } from './claim/shared/services/claim.service';
import { UserModule } from './user/user.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { CategoryComponent } from './category/category.component';
import { SupportService } from './support/shared/services/support.service';
import { InviteService } from './invite/shared/services/invite.service';
import { AboutComponent } from './about/about.component';
import { ProfileService } from './profile/shared/services/profile.service';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { Camera } from '@ionic-native/camera/ngx';
import { MenuRoutingModule } from './menu-routing.module';
import { InviteComponent } from './invite/invite.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { AboutService } from './about/shared/service/about.service';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemInfoService } from './item-info/shared/service/item-info.service';
import { ShareModule } from 'src/app/shared/components/share/share.module';
import { UserService } from './user/shared/services/user.service';
import { ClaimPage } from './claim/claim.page';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ColleguesComponent } from './collegues/collegues.component';
import { ColleguesService } from './collegues/shared/services/collegues.service';
import { MoveModule } from 'src/app/shared/components/move-top/move-top.module';
import { OwlRatingModule } from 'owl-ng';
import { FilterCollegueModule } from 'src/app/shared/components/filter-collegue/filter-collegue.module';
import { CollegueItemComponent } from './collegues/shared/components/collegue-item/collegue-item.component';

@NgModule({
  declarations: [
    ClaimPage,
    MenuComponent,
    AboutComponent,
    InviteComponent,
    SupportComponent,
    ProfileComponent,
    CategoryComponent,
    ItemInfoComponent,
    ColleguesComponent,
    CollegueItemComponent
  ],
  imports: [
    UserModule,
    IonicModule,
    ShareModule,
    SharedModule,
    DirectiveModule,
    ComponentModule,
    MenuRoutingModule,
    MoveModule,
    OwlRatingModule,
    FilterCollegueModule
  ],
  providers: [
    Camera,
    AuthService,
    UserService,
    ClaimService,
    AboutService,
    InviteService,
    ProfileService,
    SupportService,
    ItemInfoService,
    ColleguesService
  ]
})
export class MenuModule { }
