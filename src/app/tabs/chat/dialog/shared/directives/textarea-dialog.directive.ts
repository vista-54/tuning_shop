import {Directive, OnInit, HostListener} from "@angular/core";

@Directive({
    selector: '[appTextareaDialog]'
})
export class TextareaDialogDirective implements OnInit {

    public textarea: any;

    ngOnInit() {
        this.textarea = document.getElementsByClassName('write_message_dialog')[0];
    }

    @HostListener('keydown')
    autosize() {
        this.textarea['style']['cssText'] = 'heigth:auto;';
        this.textarea['style']['height'] = this.textarea['scrollHeight'] + 'px';
    }
}