import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Dynamic title'
  number = 41
  ar = [1, 2, 3]
  obj = { a: 1, b: {c: 2}}

  // img = 'https://cdn.icon-icons.com/icons2/3660/PNG/512/programming_tecnology_react_logo_native_icon_228491.png'

  inputValue = ''

  constructor() {
    // setTimeout(() => {
    //   console.log('Timeout is over')
    //   this.img = "https://www.bigroomstudios.com/wp-content/uploads/2017/08/angular-logo-big-room-studios.png"
    // }, 5000)
  }

  onInput(event: any) {
    this.inputValue = event.target.value
  }

  onBlur(str: string) {
    this.inputValue = str
  }
  onclick() {
    console.log('Click')
  }
}
