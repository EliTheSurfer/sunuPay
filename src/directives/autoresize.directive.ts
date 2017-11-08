// An autoresize directive that works with ion-textarea in Ionic 2
// Usage example: <ion-textarea autoresize [(ngModel)]="body"></ion-textarea>
// Based on https://www.npmjs.com/package/angular2-autosize

import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autoresize]'
})
export class AutoresizeDirective {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  @Input('autoresize') maxHeight: number;

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    let ta = this.element.nativeElement.querySelector("textarea");
    if(ta) {
      ta.style.overflow = "hidden";
      ta.style.height = null;
      ta.style.height = Math.min(ta.scrollHeight, this.maxHeight) + "px";
    }
  }
}