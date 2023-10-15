import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-counter',
  template: `Counter: {{counter}}`
})
export class CounterComponent {
  counter = 0

  @Output() counterEmitter = new EventEmitter<number>()

  increment() {
    this.counter++
    // emit позволит передать родительским элементам какие-либо значения
    this.counterEmitter.emit(this.counter)
  }

  decrement() {
    this.counter--
  }

}
