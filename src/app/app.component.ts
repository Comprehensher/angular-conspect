import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core'
import {ModalComponent} from "./modal/modal.component";
import {RefDirective} from "./ref.directive";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // этот декоратор, нужен для доступа к собственной директиве appRef
  @ViewChild(RefDirective, {static: false}) refDir: RefDirective
  // constructor для инъекций в данный компонент
  constructor(
    private resolver: ComponentFactoryResolver,
    private title: Title,
    // нужна для работы с тегами
    private meta: Meta
  ) {
    // получаем тот title который у нас в index.html
    // const t = title.getTitle()

    // мы можем изменять title (если так делаем не в конструкторе, то обращаемся через ключевое слово this)
    title.setTitle('App Component Page')
    // соответственно можем добавлять тег, получать тег, удалять теги
    // в секцию <head> добавятся два тега meta, они будут выглядеть
    // <meta name="keywords" content="angular,google,appcomponent">
    // <meta name="description" content="this is app component">
    this.meta.addTags([
      {name: 'keywords', content: 'angular,google,appcomponent'},
      {name: 'description', content: 'this is app component'}
    ])
  }

  showModal() {
    // передаем наш компонент ModalComponent
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent)
    // получаем ссылку на container - containerRef, в который мы можем помещать разоичные компоненты
    // сначала очищаем контейнер в случаем, если там что-то есть
    this.refDir.containerRef.clear()
    // и вот ЗДЕСЬ создаем динамический компонет в контейнере
    const component = this.refDir.containerRef.createComponent(modalFactory)
    // переменная компонет - это и есть созданный наш динамический компонент - Модальное окно, напишем ему title
    component.instance.title = 'Dynamic Title'
    // Чтобы закрыть модальное окно (Кнопка close из самого модального окна), то как мы помним
   //  модальное окно использует output emitter, а значит мы на него сможем подписаться
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear()
    })
  }
}
