import {Component, OnInit} from '@angular/core';

export interface Post {
  title: string
  text: string
  id?: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [
    {title: 'Хочу выучить Angular компоненты', text: 'Я все еще учу компоненты', id: 1},
    {title: 'Следующий блок', text: 'Будет про директивы и еще про пайпы', id: 2}
  ]

  ngOnInit(): void {
    setTimeout(() => {
      console.log('Timeout')
      this.posts[0] = {
        title: 'changed',
        text: 'changed 2',
        id: 33
      }
    }, 5000)
  }

  updatePosts(post: Post) {
    // добавляем в  массив как первый элемент, в начало списка
    this.posts.unshift(post)
    // console.log('Post', post)
  }

  removePost(id: number) {
    console.log('Id to remove', id)
    // для удаления из массива
    // на каждой иттерации мы будем получать объект p, и даллее если p.id не совпадает с переданным id мы его исключаем
    // из результирующего массива posts
    this.posts = this.posts.filter(p => p.id !== id)
  }

}
