import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post, PostsService} from "../posts.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  post: Post
  constructor(
    private route: ActivatedRoute,
    // сервис просто нужен для того чтобы загружать по id посты
    // в не прописана логика getById
    private postsService: PostsService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // this.route объект отвечает за текущий роут, который загружен
    // через params достаем параемтр url, params на самом деле стрим, поэтому на него подписываемся
    this.route.params.subscribe((params: Params) => {
      console.log('Params', params)
      // id is parameter name, that we specified in app-routing.module.ts path: 'posts/:id'
      // + - converts it to number, or you also can use parseInt
      this.post = this.postsService.getById(+params['id'])
    })
  }

  loadPost() {
    this.router.navigate(['/posts', 44])
  }
}
