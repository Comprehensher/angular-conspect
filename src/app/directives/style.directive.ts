import {Directive, ElementRef} from "@angular/core";

// use [] when it need to create not tag but attribute
@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  constructor(private el: ElementRef) {
    // el это доступ до элемента где будет этот аттрибут
    // доступ будем получать через nativeElement
    console.log(el);
    // например меняем стиль элемента
    el.nativeElement.style.color = 'red'
  }
}
