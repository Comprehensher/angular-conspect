import {Component, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';


@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges {

  defaultColor = 'blue'
  @Input('appColor') color: string

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    // будет равняться this.color, но в случае если мы не передавли его то
    // тогда будет равняться по умолчанию defaultColor = blue
    this.el.nativeElement.style.backgroundColor = this.color || this.defaultColor
  }

}
