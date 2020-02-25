import { MomentModule } from 'angular2-moment';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../shared.module';
import { CommentsComponent } from './comments.component';
import { CommentsService } from './shared/services/comments.service';
import { OwlRatingModule } from 'owl-ng';
import { CommentItemComponent } from './shared/components/comment-item/comment-item.component';
import { MoveModule } from '../move-top/move-top.module';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentItemComponent],
  imports: [
    MoveModule,
    IonicModule,
    SharedModule,
    MomentModule,
    DirectiveModule,
    OwlRatingModule
  ],
  entryComponents: [CommentsComponent],
  providers: [CommentsService]
})
export class CommentsModule { }
