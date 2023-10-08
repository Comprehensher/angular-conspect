import {Component, OnInit} from '@angular/core'
import {PostsService} from '../posts.service'
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  showIds = false
  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // получаем Router и его queryparams которые является стримом, и нужно на него подписаться
    this.route.queryParams.subscribe((params: Params) => {
      // !! - так мы конвертируем строку в bolean значение, сначала инверсия, а потом мы приводим его к соотв резултату
      this.showIds = !!params['showIds']
    })
  }

  showIdsProgram() {
    this.router.navigate(['/posts'], {
      queryParams: {
        showIds: true
      }
    })
  }
}
