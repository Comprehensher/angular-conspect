import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'about',
    // import позволяет нам динамически импортировать какие-либо элементы
    // т.к. такой import - promise, тщ у него мы можем вызвать метод then и вернуть наш модуль
    loadChildren: () => import('./about-page/about-page.module').then(x => x.AboutPageModule)
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // подгружает модули при старте апп, так что когда переходим на нужную страницу, нам не нужно грузить никакие модули
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
