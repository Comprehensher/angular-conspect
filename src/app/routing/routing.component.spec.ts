import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingComponent } from './routing.component';
import { Subject} from "rxjs";
import {ActivatedRoute, Params, Router, RouterOutlet} from "@angular/router";
import {PostsService} from "../posts/posts.service";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

// пишем свой моковый роутер, чтобы не подтягивать dependecy реального роутера
// т.о. мы не будем проверять метод navigate, это делает комманда Angular
class RouterStub {
  navigate(path: string[]) {}
}

class ActivatedRouteStub {
  // Subject работает как Observable, но позволяет еще эмитить новый события
  private subject = new Subject<Params
  >()

  // тут мы просто эммитим эти события
  push(params: Params) {
    this.subject.next(params)
  }

  get params() {
    // возвращаем тот объект, в котором хранятся текущие значения
    // но возвращаем как Observable
    return this.subject.asObservable()
  }
}

describe('RoutingComponent', () => {
  let component: RoutingComponent;
  let fixture: ComponentFixture<RoutingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutingComponent],
      imports: [RouterTestingModule],
      providers: [
        // говорим, что вместо Router хотим использовать свой класс RouterStub
        // другими словами: "Друг, я кидаю тебе роутер, но вместо этого роутера используй мой класс
        {provide: Router, useClass: RouterStub},
        // тоже самое и для ActivatedRoute
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    });
    fixture = TestBed.createComponent(RoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it ('should navigate to posts if go back', () => {
    let router = fixture.debugElement.injector.get(Router)
    let spy = spyOn(router, 'navigate')

    component.goBack()
    // проверяем просто если spy был вызван, а не проверяем саму навигацию
    expect(spy).toHaveBeenCalledWith(['/posts'])
  })

  it ('should navigate to 404 if id = 0', () => {
    // создаем роутер
    let router = fixture.debugElement.injector.get(Router)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute)
    let spy = spyOn(router, 'navigate')

    route.push({id: '0'})

    expect(spy).toHaveBeenCalledWith(['/404'])
  })

  // проверим если нужная директива у шаблона html
  it('should have router-outlet directive', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet))

    expect(de).not.toBeNull()
  })
});
