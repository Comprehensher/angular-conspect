import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  // будем тестировать на наличие параметров в адрессной строке
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] === '0') {
        this.router.navigate(['/404'])
      }
    })
  }

  // делаем программную навигацию из данного компонента
  goBack() {
    this.router.navigate(['/posts'])
  }

}
