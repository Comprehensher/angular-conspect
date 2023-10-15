import {CounterComponent} from "./counter.component";
import {FormBuilder} from "@angular/forms";

describe('CounterComponent', () => {
  let component: CounterComponent

  // будет вызываться перед каждым тестом
  beforeEach(() => {
    component = new CounterComponent(new FormBuilder())
  })

  // есть также вспомогательные методы beforeAll - будет вызван перед всеми it-ми
  // afterEach - данный метод будет вызвон после каждого it-a
  // afterAll - который вызывается после завершения всех тестов

  it('should increment counter by 1', () => {
    component.increment()
    // ожидаем что поле counter объекта compnent должно быть 1
    expect(component.counter).toBe(1)
  })

  // чтобы скипнуть тест добавлять x к it - получится xit
  it('should decrement counter by 1', () => {
    component.decrement()
    // ожидаем что поле counter объекта compnent должно быть 1
    expect(component.counter).toBe(-1)
  })

  // в этом тесте проверяем значение которое передается на верх, counter-component-ом
  it('should increment value by event emitter', () => {
    let result
    // emitter является Observable, то мы можем подписываться на их значения, занесем значение в result
    component.counterEmitter.subscribe(v => result = v)

    component.increment()

    expect(result).toBe(1)
  })

  // протестируем, а были ли вообще созданы контролы
  it('should create form with 2 controls', () => {
    expect(component.form.contains('login')).toBe(true)
    // тоже самое что и toBe(true)
    expect(component.form.contains('email')).toBeTruthy()
  })

  //  проверим работает ли валидация
  it('should mark login as invalid if empty value', () => {
    const control = component.form.get('login')

    control.setValue('')

    expect(control.valid).toBeFalsy()
  })

})
