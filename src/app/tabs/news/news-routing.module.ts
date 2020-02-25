import { CreateComponent } from './create/create.component';
import { NewsComponent } from './news.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewsService } from './shared/services/news.service';

const routes: Routes = [
    {
        path: '', component: NewsComponent,
        resolve: {
            resolve: NewsService
        },
    },
    {
        path: 'create', component: CreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule {
}
