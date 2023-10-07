import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, throwError} from "rxjs";

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
      params
    })
      // pipe просто для иммитирования долгой загрузки
      // ловим ошибку в pipe если они есть
      // и возвращаем Observable в котором обернута ошибка
      .pipe(
        delay(500),
        catchError(error => {
          console.log('Error: ', error.message)
          return throwError(error)
        })
        )
  }

  removeTodo(id: number): Observable<void> {
    // В конце указываем id элемента, который необходимо удалить
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  completeTodo(id: number): Observable<Todo> {
    // в body указываем те поля которые хотим модифицировать
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    })
  }
}
