import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appIfnot]'
})
export class IfnotDirective {
  @Input('appIfnot') set ifNot(condition: boolean) {
    if (!condition) {
      // Показать элементы
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      // Скрыть
      this.viewContainer.clear()
    }
  }
  // templateRef - содержит в себе содержимое того
  // того темплейта <ng-template [ngIf]="isVisible">
  // viewContainer - указывает на ng-template
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

}
