import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  // мы хотим чтобы данный параметр мы могли передавать от отцовского компнента сюда испльзуем Input
  @Input() title = 'Default title';
  // мы должны экспортировать некоторые события в отцовский компонет используем Output и EventEmmiter
  @Output() close = new EventEmitter<void>()

}
