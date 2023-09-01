import { AfterViewInit, Directive } from '@angular/core';

@Directive({
  selector: '[fmSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {}
}
