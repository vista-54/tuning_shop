import { Directive, Input, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[reiszeTextarea]'
})
export class ResizeTextareaDirective {


    constructor(private el: ElementRef) {

    }

    @HostListener('keydown')
    autosize() {
        this.el.nativeElement['style']['cssText'] = 'padding: 10px 10px';
        // this.el.nativeElement['style']['height'] = this.el.nativeElement['scrollHeight'] + 'px';
    }
}