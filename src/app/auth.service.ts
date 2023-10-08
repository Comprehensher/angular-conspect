import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuth = false

  login() {
    this.isAuth = true
  }

  logout() {
    this.isAuth = false
  }

  // проверяет авторизован ли сейчас пользователь
  // сделаем ассинхронный метод для того чтобы сэмулировать, что мы идем на сервер (какбы проверяем сессию, или
  // токен какой-нибудь)
  isAuthenticated(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.isAuth)
      }, 1000)
    })
  }
}
