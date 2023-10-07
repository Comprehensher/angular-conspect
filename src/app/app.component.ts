import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
  todoTitle = ''
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    // указывам get в <> в каком типе возвращать объекты Response

    // this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    //   .subscribe(response => {
    //     console.log('Response', response)
    //     this.todos = response
    //   })

    // можем перезаписать вместо response todos , еквиалентно закомментированной команде
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe(todos => {
        console.log('Response', todos)
        this.todos = todos
      })
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
}
