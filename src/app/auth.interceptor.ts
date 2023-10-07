// по сути это как Service
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
  // перехватываем request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercept request', req)
    // далее мы продолжаем request, но уже с модифицированными данными
    // если не вызовем handle то request не сможет продолжиться
    return next.handle(req);
  }

}
