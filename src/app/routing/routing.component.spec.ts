import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingComponent } from './routing.component';
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostsService} from "../posts/posts.service";

// пишем свой моковый роутер, чтобы не подтягивать dependecy реального роутера
// т.о. мы не будем проверять метод navigate, это делает комманда Angular
class RouterStub {
  navigate(path: string[]) {}
}

class ActivatedRouteStub {
  params: Observable<Params>
}

describe('RoutingComponent', () => {
  let component: RoutingComponent;
  let fixture: ComponentFixture<RoutingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutingComponent],
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
});
