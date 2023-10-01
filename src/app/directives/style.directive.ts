import {Directive, ElementRef, Renderer2} from "@angular/core";

// use [] when it need to create not tag but attribute
@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  constructor(private el: ElementRef, private r: Renderer2) {
    // el это доступ до элемента где будет этот аттрибут
    // доступ будем получать через nativeElement
    // например меняем стиль элемента
    this.r.setStyle(this.el.nativeElement, 'color', 'blue')
  }
}
