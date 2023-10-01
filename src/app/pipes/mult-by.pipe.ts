import {Pipe, PipeTransform} from "@angular/core";

// по какому названию мы будет обращаться к пайпу - укажем mult
@Pipe({
  name: 'mult'
})
export class MultByPipe implements PipeTransform {
  // принимаем значения и трансформируем в этой функции
  transform(num: number, pow: number = 2): number {
    return num * pow
  }

}
