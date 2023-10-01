import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

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
  // передаем 1 -ый параметр в декортаор строку,
  // название события, которое мы хотим слушать на элементе куда добавлена дирректива
  // 2-ой параметр, массив обычный js-event через target получаем parent html element
  @HostListener('click', ['$event.target']) onClick(event: Event) {
    console.log(event)
  }
}
