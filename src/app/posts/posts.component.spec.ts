import {PostsComponent} from "./posts.component";
import {PostsService} from "./posts.service";
import {ComponentFixture, TestBed, waitForAsync, fakeAsync, tick} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>
  let component: PostsComponent
  let service: PostsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ PostsService ],
      // PostsService содержит в себе HttpClient, и поэтому его тоже нужно заинъекцировать
      imports: [HttpClientModule]
    })

    fixture = TestBed.createComponent(PostsComponent)
    component = fixture.componentInstance
    // как нам получить экземпляр PostsService, два способа:
    // 1)
    service = fixture.debugElement.injector.get(PostsService)
    // 2)
    // service = TestBed.get(PostsService)
  })

  // мы не будет руками вызывать ngOnInit он должен быть вызван автоматически
  xit('should fetch posts on ngOnInit', () => {
    const posts = [1, 2, 3]
    // service возвращает Observable, поэтому мы можем с помощью метода of() создать Observable
    spyOn(service, 'fetch').and.returnValue(of(posts))

    fixture.detectChanges()

    expect(component.posts).toEqual(posts)
  })


  it('should fetch posts on ngOnInit (promise)', fakeAsync(() => {
    const posts = [1, 2, 3]
    spyOn(service, 'fetchPromise').and.returnValue(Promise.resolve(posts))
    fixture.detectChanges()

    // явно указываем что нужно подождать некоторое количество времени
    tick()

    expect(component.posts.length).toBe(posts.length)

  }))

})
