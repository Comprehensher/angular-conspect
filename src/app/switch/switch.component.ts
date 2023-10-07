import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {state} from "@angular/animations";

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SwitchComponent implements ControlValueAccessor {

  state = 'off';

  private onChange = (value: any) => {}

  // it's call function onChange
  setState(state: string) {
    this.state = state
    this.onChange(this.state)
  }

  // будет принимать в себя функцию, которая будет следить за изменениями
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  // тоже, но для мобильных устройств
  registerOnTouched(fn: any): void {
  }

  writeValue(state: string): void {
    this.state = state
  }

}
