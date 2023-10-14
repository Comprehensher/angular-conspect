import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: HomePageComponent, pathMatch: 'full'},
    {path: 'about',
      // import позволяет нам динамически импортировать какие-либо элементы
      // т.к. такой import - promise, тщ у него мы можем вызвать метод then и вернуть наш модуль
      loadChildren: () => import('./about-page/about-page.module').then(x => x.AboutPageModule)
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
