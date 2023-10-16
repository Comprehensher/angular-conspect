import {PostsComponent} from "./posts.component";
import {PostsService} from "./posts.service";
import {EMPTY, of} from "rxjs";

describe('PostsComponent', () => {
  let component: PostsComponent
  let service: PostsService

  beforeEach(() => {
    // так как PostsService - моковый, мы не будем на самом деле передавать какие-либо запросы на сервер
    // поэотому в конструктор передаем null, а не httpclient
    service = new PostsService(null)
    component = new PostsComponent(service)
  })

  it('should call fetch when NgOnInit', () => {
    // не вызываем реально метод fetch в posts.service (т.е. не посылаем запрос в бд)
    // а просто следим вызываося ли он. Передаем service т.к. это позволяет следить за вызовами всех его методов
    // и непосредственно сам метод в строчке. И вместо того чтобы вызывать самом метод fetch мы будем в методе callFake
    // вызывать его call back
    const spy = spyOn(service, 'fetch').and.callFake(() => {
      // неважно какие данные, нам главное проверить, что данный spy был вызван
      return EMPTY;
    })

    component.ngOnInit()
    // ожидаем что этот метод spy был вызван
    expect(spy).toHaveBeenCalled()

  })

  // когда мы вызываем метод fetch, нам нужно понять что переменной post[] присвоились данные
  it('should update posts length after ngOnInit', () => {
    const posts = [1, 2, 3, 4]
    spyOn(service, 'fetch').and.callFake(() => {
      // чтобы вернуть данные будем использовать Observable, метод of() позволяет его созлать
      // массив данных любой
      return of(posts);
    })
    // есть более короткий вариант вызова spyOn и возврата значения
    // spyOn(service, 'fetch').and.returnValue(of(posts))

    component.ngOnInit()

    expect(component.posts.length).toBe(posts.length)

  })

  it('should remove post if user confirms', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY)
    // Нужно проверить вызывался ли confirm метод, а он находится у объекта window
    // и нужно сказать якобы пользователь подтвердил выбор - возвращаем значение true у этого окощка
    spyOn(window, 'confirm').and.returnValue(true)

    component.delete(10)
    // Ожидаем что spy был вызван с параметром 10
    expect(spy).toHaveBeenCalledWith(10)
  })

  // случай когда пользователь отменил confirm окно
  it('should NOT remove post if user does not confirm', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY)
    // Нужно проверить вызывался ли confirm метод, а он находится у объекта window
    // и нужно сказать якобы пользователь НЕ подтвердил выбор - возвращаем значение false у этого окощка
    spyOn(window, 'confirm').and.returnValue(false)

    component.delete(10)
    // Ожидаем что spy НЕ был вызван с параметром 10
    expect(spy).not.toHaveBeenCalled()
  })

})
