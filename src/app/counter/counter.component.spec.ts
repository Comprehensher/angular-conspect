import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CounterComponent} from "./counter.component";
import {By} from "@angular/platform-browser";

describe('CounterComponent', () => {
  let component: CounterComponent
  let fixture: ComponentFixture<CounterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })

    fixture = TestBed.createComponent(CounterComponent)
    component = fixture.componentInstance
    // fixture.debugElement
    // fixture.nativeElement
  })

  it('should be created', () => {
    expect(component).toBeDefined()
  })

 // проверим что переменная counter корректно баиндится между шаблоном и компонентом (counter.component.html и counter.component.ts)
 // т.е когда меняется поле в компоненте, нам нужно проверить что оно так же изменилось в шаблоне
  it('should render counter property', () => {
    let num = 42
    component.counter = num

    // говорим Angular что у нас были изменения, изменилось поле
    fixture.detectChanges()

    // делаем запрос по css selector
    let debugel = fixture.debugElement.query(By.css('.counter'))
    let el: HTMLElement = debugel.nativeElement

    expect(el.textContent).toContain(num.toString())
  })

})
