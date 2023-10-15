import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appRef]'
})
export class RefDirective {
  // с помощью переменной containerRef мы делали либо очистку контейнера для структурных директив либо помещали
  // туда какой-то html createEmbeddedView
  constructor(public containerRef: ViewContainerRef) {
  }
}
