import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, delay, map, Observable, tap, throwError} from "rxjs";

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders( {
      'MyCustomHeader': Math.random().toString()
    })
    // Указываем с каким типом данных работает post в нашем случае Todo
    // В третий параметр мы можем передавать различные опции в том числе и header
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers
    })
  }
  // А здесь в опциях мы укаазываем url квери параметры в ключ params:
  fetchTodods(): Observable<Todo[]> {
    let params = new HttpParams()
    // данная конструкция возвращает новый объект params
    params = params.append('_limit', '4')
    // params будет создержать предыдущее и следующее значение
    params = params.append('custom', 'anything')

    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params,
      // здесь мы можем явно указывать какой тип данных мы хотим получить в ответе. по умолчанию body
      // если response - то мы получаем целый response, а не тольк его body, и соотственно мы можем получать другие
      // другие параметры response - такие как status, и т.д. и можем с ними работать
      observe: 'response'
    })
      // pipe просто для иммитирования долгой загрузки
      // ловим ошибку в pipe если они есть
      // и возвращаем Observable в котором обернута ошибка
      .pipe(
        // мы не возвращаем тип Observable<Todo[]>, поэтому нужно преобразовать данные с помощью map
        map(response => {
          // console.log('Response', response)
          return response.body
        }),
        delay(500),
        catchError(error => {
          console.log('Error: ', error.message)
          return throwError(error)
        })
        )
  }

  removeTodo(id: number): Observable<any> {
    // В конце указываем id элемента, который необходимо удалить
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      // получаем доступ до всех событий, которые происходят с ассинхронным запросом:
      // такие как: запрос подгоотовлен, запрос отправлен, запрос пришел и т.д.
      // на каждое событие мы получаем event, который мы можем каким-то образом обрабатывать
      observe: 'events'
    }).pipe(
      // оператор tap() перехватывает промежуточные данные и мы можем с ними как-то взаимодейстовать
      tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log('Sent', event)
        }

        if (event.type === HttpEventType.Response) {
          console.log('Response', event)
        }
      })
    )
  }

  completeTodo(id: number): Observable<any> {
    // в body указываем те поля которые хотим модифицировать
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    }, {
      // json - по умолчанию
      responseType: 'json'
    })
  }
}
