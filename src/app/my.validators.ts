import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class MyValidators {
  static restrictedEmails(control: FormControl): {[key: string]: boolean} {
    // Проверяем содержит ли массив запрещенных email-ов то значение, которое мы впмсали
    if (['v@mail.ru', 'test@mail.ru'].includes(control.value)) {
      return {restrictedEmail: true}
    }
    return null
  }

  // возвращаемый тип либо Promise либо Observable
  static uniqEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        // где 'async@mail.ru' будет запрещенным email
        if (control.value === 'async@mail.ru') {
          resolve({uniqEmail: true})
        } else {
          resolve(null)
        }
      }, 1000)
    })
  }
}
