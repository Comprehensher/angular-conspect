import {Directive} from "@angular/core";

// use [] when it need to create not tag but attribute
@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {

}
