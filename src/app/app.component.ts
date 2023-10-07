import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";

export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []

  loading = false

  todoTitle = ''
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    }

    // Указываем с каким типом данных работает post в нашем случае Todo
    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
      .subscribe(todo => {
        console.log('todo', todo)
        this.todos.push(todo)
        this.todoTitle=''
      })
  }

  fetchTodos() {
    // когда начинаем грузить какие-то данные, говорим, что loading находится в значении true
    this.loading = true
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      // pipe просто для иммитирования долгой загрузки
      .pipe(delay(1500))
      .subscribe(todos => {
        this.todos = todos
        // после того как загрузили эти данные будем говорить что this.loading = false
        this.loading = false
      })
  }
}
