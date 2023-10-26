import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      // если путь пустой, то вначале мы загружаем layout,
      // но чтобы мы загрузили нужную страницу HomePageComponent, у которой тоже пустой путь указываем redirect
      // / - будет указывать на HomePageComponent
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
