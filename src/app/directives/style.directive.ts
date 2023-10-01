import {Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

// use [] when it need to create not tag but attribute
@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  @Input('appStyle') color: string = 'blue'
  @Input() fontWeight = 'normal'
  constructor(private el: ElementRef, private r: Renderer2) {
  }
  // передаем 1 -ый параметр в декортаор строку,
  // название события, которое мы хотим слушать на элементе куда добавлена дирректива
  // 2-ой параметр, массив обычный js-event через target получаем parent html element
  @HostListener('click', ['$event.target']) onClick(event: Event) {
    console.log(event)
  }

  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.el.nativeElement, 'color', this.color)
    this.r.setStyle(this.el.nativeElement, 'fontWeight', this.fontWeight)
  }

  @HostListener('mouseleave') onLeave() {
    this.r.setStyle(this.el.nativeElement, 'color', null)
    this.r.setStyle(this.el.nativeElement, 'fontWeight', null)
  }
}
