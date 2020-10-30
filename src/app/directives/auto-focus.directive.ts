import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public autofocus: Boolean

  public constructor(private el:ElementRef) { }

  public ngAfterContentInit() {
    //
  }

}
