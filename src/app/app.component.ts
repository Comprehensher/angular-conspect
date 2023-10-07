import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";
import {Todo, TodosService} from "./todos.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []

  loading = false

  todoTitle = ''
  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
    }

    // передаем в addTodo объект Todo
    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
      console.log('todo', todo)
      this.todos.push(todo)
      this.todoTitle=''
    })
  }

  fetchTodos() {
    // когда начинаем грузить какие-то данные, говорим, что loading находится в значении true
    this.loading = true
    this.todosService.fetchTodods()
      .subscribe(todos => {
        this.todos = todos
        // после того как загрузили эти данные будем говорить что this.loading = false
        this.loading = false
      })
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        // удаляем элемент из нашего массива на front-end-е
        this.todos = this.todos.filter(t => t.id !== id)
      })
  }

  completeTodo(id: number) {
    // получается что subscribe выполняет поток, а в сервесе мы его инициализируем
    this.todosService.completeTodo(id).subscribe(todo => {
      this.todos.find(t=> t.id === todo.id).completed = true
    })
  }
}
