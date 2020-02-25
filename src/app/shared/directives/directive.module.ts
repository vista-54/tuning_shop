import { NgModule } from '@angular/core';
import { UnreadMessagesDirective } from './unread-messages';
import { ResizeTextareaDirective } from './resize-textarea';
import { CartCountDirective } from './cart-count.directive';

@NgModule({
    declarations: [
        CartCountDirective,
        ResizeTextareaDirective,
        UnreadMessagesDirective
    ],
    exports: [
        CartCountDirective,
        UnreadMessagesDirective,
        ResizeTextareaDirective
    ],
})

export class DirectiveModule { }