import {Component} from '@angular/core';
import {AppCounterService} from "./Services/app-counter.service";
import {LocalCounterService} from "./Services/local-counter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LocalCounterService]
})
export class AppComponent {

  constructor(
    public appCounterService: AppCounterService,
    public localCounterService: LocalCounterService
    ) {
  }
}
