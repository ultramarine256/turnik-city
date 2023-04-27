import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-bullet',
  template: `
    <div class="c-bullet">
      <app-user-circle [imageUrl]="imageUrl"></app-user-circle>
      <div class="c-bullet__right">
        <div class="c-bullet__title">{{ title }}</div>
        <div class="c-bullet__subtitle">{{ subtitle }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .c-bullet {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        .c-bullet__right {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .c-bullet__title {
            font-weight: 400;
          }

          .c-bullet__subtitle {
            color: #727272;
            font-size: 90%;
          }
        }
      }
    `,
  ],
})
export class UserBulletComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
}
