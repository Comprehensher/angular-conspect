import {FormControl} from "@angular/forms";

export class MyValidators {
  static restrictedEmails(control: FormControl): {[key: string]: boolean} {
    // Проверяем содержит ли массив запрещенных email-ов то значение, которое мы впмсали
    if (['v@mail.ru', 'test@mail.ru'].includes(control.value)) {
      return {restrictedEmail: true}
    }
    return null
  }
}
