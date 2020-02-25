import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '', redirectTo: 'menu', pathMatch: 'full'
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
          }
        ]
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {
}
