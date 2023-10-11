import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post} from "../posts.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  post: Post
  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    // в snapshot хранится снимок состояния rout-а
    // this.post = this.route.snapshot.data['post']
    // Получаем data['post'], которе мы уазывали в app-routing.module.ts
    this.route.data.subscribe(data => {
      this.post = data['post']
      }
    )

    // this.route объект отвечает за текущий роут, который загружен
    // через params достаем параемтр url, params на самом деле стрим, поэтому на него подписываемся
    // this.route.params.subscribe((params: Params) => {
    //   console.log('Params', params)
    //   // id is parameter name, that we specified in app-routing.module.ts path: 'posts/:id'
    //   // + - converts it to number, or you also can use parseInt
    //   this.post = this.postsService.getById(+params['id'])
    // })
  }

  loadPost() {
    this.router.navigate(['/posts', 44])
  }
}
