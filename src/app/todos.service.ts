import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
    // Указываем с каким типом данных работает post в нашем случае Todo
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
  }

  fetchTodods(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todosа?_limit=2')
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
