import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {PostsComponent} from "./posts/posts.component";

// http://localhost:4200/ - по такому пути нам необходимо зарегистировать HomeComponent
// http://localhost:4200/about - по такому пути нам необходимо зарегистировать AboutComponent
// http://localhost:4200/posts - по такому пути нам необходимо зарегистировать PostsComponent
const routes: Routes = [
  // в path указываем путь, который будет зарегистрирован для определенной страницы
  // второй параметр - на этот роут мы хотим чтобы открывался компонент HomeComponent
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'posts', component: PostsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
