import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./post/post.component";
import {AboutExtraComponent} from "./about-extra/about-extra.component";

// http://localhost:4200/ - по такому пути нам необходимо зарегистировать HomeComponent
// http://localhost:4200/about - по такому пути нам необходимо зарегистировать AboutComponent
// http://localhost:4200/posts - по такому пути нам необходимо зарегистировать PostsComponent
// http://localhost:4200/about/extra - по такому пути нам необходимо зарегистировать AboutExtraComponent
const routes: Routes = [
  // в path указываем путь, который будет зарегистрирован для определенной страницы
  // второй параметр - на этот роут мы хотим чтобы открывался компонент HomeComponent
  {path: '', component: HomeComponent},
  // укажем у страницы About вложенный route
  {path: 'about', component: AboutComponent, children: [
      // у children точно также объявляется router
      {path: 'extra', component: AboutExtraComponent}
    ]},
  {path: 'posts', component: PostsComponent},
  // говорим, что наше приложение будет еще обрабатывать какую-то динамику
  // после /  будет добавляться какое-то число, которое будет постоянно разным - :id
  {path: 'posts/:id', component: PostComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
