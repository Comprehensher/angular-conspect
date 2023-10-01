import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from "@angular/core";

// use [] when it need to create not tag but attribute
@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  @Input('appStyle') color: string = 'blue'
  @Input() dStyles: {border?: string, fontWeight?: string, borderRadius?: string}

  // передаем назание того аттрибута который мы хотим забаиндить на нужную нам переменную
  @HostBinding('style.color') elColor = null
  constructor(private el: ElementRef, private r: Renderer2) {
  }
  // передаем 1 -ый параметр в декортаор строку,
  // название события, которое мы хотим слушать на элементе куда добавлена дирректива
  // 2-ой параметр, массив обычный js-event через target получаем parent html element
  @HostListener('click', ['$event.target']) onClick(event: Event) {
    console.log(event)
  }

  @HostListener('mouseenter') onEnter() {
    this.elColor = this.color
    // this.r.setStyle(this.el.nativeElement, 'color', this.color)
    // this.r.setStyle(this.el.nativeElement, 'fontWeight', this.dStyles.fontWeight)
    // this.r.setStyle(this.el.nativeElement, 'border', this.dStyles.border)
    // this.r.setStyle(this.el.nativeElement, 'borderRadius', this.dStyles.borderRadius)
  }

  @HostListener('mouseleave') onLeave() {
    this.elColor = null
    // this.r.setStyle(this.el.nativeElement, 'color', null)
    // this.r.setStyle(this.el.nativeElement, 'fontWeight', null)
    // this.r.setStyle(this.el.nativeElement, 'border', null)
    // this.r.setStyle(this.el.nativeElement, 'borderRadius', null)
  }
}
