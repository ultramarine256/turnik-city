import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-circle',
  template: `
    <div class="img__wrapper" matRipple>
      <img class="img__url" [src]="imageUrl" alt="" />
    </div>
  `,
  styles: [
    `
      .img__wrapper {
        display: grid;
        place-content: center;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
        width: 48px;

        .img__url {
          width: 100%;
        }
      }
    `,
  ],
})
export class UserCircleComponent {
  @Input() imageUrl: string;
}
