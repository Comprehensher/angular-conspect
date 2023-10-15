import {CounterComponent} from "./counter.component";

describe('CounterComponent', () => {
  let component: CounterComponent

  // будет вызываться перед каждым тестом
  beforeEach(() => {
    component = new CounterComponent()
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

})
