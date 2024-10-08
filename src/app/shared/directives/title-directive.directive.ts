import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTitleDirective]'
})
export class TitleDirectiveDirective {

  constructor(private el: ElementRef<HTMLElement>){ 
    this.applyStyles();
  }
 

  applyStyles(): void {
    this.el.nativeElement.style.fontSize = '20px';
  }
  
}
