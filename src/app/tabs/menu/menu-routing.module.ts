import { ClaimPage } from './claim/claim.page';
import { UserService } from './user/shared/services/user.service';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { AboutService } from './about/shared/service/about.service';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/shared/services/profile.service';
import { InviteComponent } from './invite/invite.component';
import { SupportComponent } from './support/support.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemInfoService } from './item-info/shared/service/item-info.service';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ColleguesComponent } from './collegues/collegues.component';
import { ColleguesService } from './collegues/shared/services/collegues.service';

const routes: Routes = [
    {
        path: '', component: MenuComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            resolve: ProfileService,
            data: AuthService
        }
    },
    {
        path: 'about',
        component: AboutComponent,
        resolve: {
            resolve: AboutService
        }
    },
    {
        path: 'invite',
        component: InviteComponent
    },
    {
        path: 'support',
        component: SupportComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'claim',
        component: ClaimPage
    },
    {
        path: 'item/:id',
        component: ItemInfoComponent,
        resolve: {
            resolve: ItemInfoService
        }
    },
    {
        // path: 'collegues',
        path: 'collegues',
        component: ColleguesComponent,
        resolve: {
          resolve: ColleguesService
        }
        // loadChildren: () => import('./collegues/collegues.module').then(m => m.ColleguesModule)
    },
    {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
    },
    {
        path: 'user/:id',
        component: UserComponent,
        resolve: {
            resolve: UserService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule {
}
