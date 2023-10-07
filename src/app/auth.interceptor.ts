// по сути это как Service
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
  // перехватываем request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercept request', req)

    // мы не модифицируем существующий реквест, мы его клонируем
    // а потом передаем клон для дальнейшей обработки
    // а вот в методе clone мы можем модифицировать клонированный реквест
    const cloned = req.clone({
      // добавим новый header
      headers: req.headers.append('Auth', 'Some random token')
    })
    // далее мы продолжаем request, но уже с модифицированными данными
    // если не вызовем handle то request не сможет продолжиться
    return next.handle(cloned).pipe(
      // с помощью tap получаем response, и тоже можем его как-то модифицировать
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Interseptor response', event)
        }
      })
    );
  }

}
