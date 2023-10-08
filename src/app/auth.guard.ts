import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    // роутер нужен для редиректа
    private router: Router
  ) {}
  // возвращаемые типы либо Observable либо Promise либо boolean
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // возвращает Promise, а через then мы проверяем
    // если isAuth=false то перенаправляем на страницу
    return this.authService.isAuthenticated().then(isAuth => {
      if (isAuth) {
        return true
      } else {
        // делаем редирект и в квери парам передаем значение ?auth=false
        // для того чтобы обработать в дальнейшем и сообщить пользователю, что у него нет авторизации
        this.router.navigate(['/'], {
          queryParams: {
            auth: false
          }
        })
        return false
      }
    })
  }

}
