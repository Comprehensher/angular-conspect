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

}
