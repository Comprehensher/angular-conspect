import { ColorDirective } from './color.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

// программно создаем шаблон html компонент
@Component({
  template: `
    <p appColor="yellow">text 1</p>
    <p appColor>text 1</p>
  `
})
class HostComponent {}

describe('ColorDirective', () => {
  let fixture: ComponentFixture<HostComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorDirective, HostComponent ]
    })

    fixture =TestBed.createComponent(HostComponent)
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    const directive = new ColorDirective(null);
    expect(directive).toBeTruthy();
  });

  it('should apply input color', () => {
    // получаем все параграфы p, и для первого теста будем брать нулевой элемент
    let de = fixture.debugElement.queryAll(By.css('p'))[0]

    expect(de.nativeElement.style.backgroundColor).toBe('yellow')
  })

  it('should apply default color', () => {
    // получаем все параграфы p, и для этого теста будем брать второй элемент
    let de = fixture.debugElement.queryAll(By.css('p'))[1]

    // получаем саму директиву
    let directive = de.injector.get(ColorDirective)

    expect(de.nativeElement.style.backgroundColor).toBe(directive.defaultColor)
  })
});
