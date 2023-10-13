import {NgModule} from "@angular/core";
import {ColorDirective} from "./color.directive";
import {PageNamePipe} from "./page-name.pipe";
// import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ColorDirective,
    PageNamePipe,
  ],
  // imports: [
  //   // чтобы импортировать стандартные элементы Angular
  //   // такие как BrowseModule
  //   CommonModule,
  // ],
  // в exports массив добавляем чтоб и другие элементы могли их увидеть
  exports: [
    ColorDirective,
    PageNamePipe,
    // CommonModule
  ]
})
export class SharedModule {

}
