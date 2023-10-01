import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Post} from "../app.component";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {

  @Output() onAdd: EventEmitter<Post> = new EventEmitter<Post>()
  // именно здсь мы в переменной получаем наш html-element
  @ViewChild('titleInput', {static: false}) inputRef: ElementRef

  title = ''
  text = ''

  addPost() {
    if (this.text.trim() && this.title.trim()) {
      const post: Post = {
        title: this.title,
        text: this.text
      }
      // вызываем тогда когда хотим отправить какие-то данные наружу
      this.onAdd.emit(post)

      this.title = this.text = ''
    }
  }

  focusTitle() {
    this.inputRef.nativeElement.focus()
  }

}
