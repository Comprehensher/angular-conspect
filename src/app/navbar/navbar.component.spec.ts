import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterLinkWithHref} from "@angular/router";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have link to posts page', ()=> {
    // queryAll - нужно получить список всех ссылок
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    // должен присутствовать аттрибут href, который должен равняться строке posts
    let index = debugElements.findIndex(e => e.properties['href'] === '/posts');
    // если индекс > -1, то это означает что ссылка была найдена
    expect(index).toBeGreaterThan(-1)
  })
});
