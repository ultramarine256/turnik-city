import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  template: `
    <div class="t-container">
      <div class="t-content">
        <h1 class="t-content__title">404</h1>
        <p class="t-content__sub-title">
          <span class="text-danger">Opps!</span>
          Page not found.
        </p>
        <p class="t-content__description">The page you’re looking for doesn’t exist.</p>
        <a mat-flat-button routerLink="/">Go Home</a>
      </div>
    </div>
  `,
  styles: [
    `
      .t-container {
        display: grid;
        place-content: center;
        width: 100%;
        height: 600px;

        .t-content {
          text-align: center;

          .t-content__title {
            font-size: 4rem;
          }

          .t-content__sub-title {
            font-size: 1.5rem;
            font-weight: 500;
            margin: 1rem 0;
          }

          .t-content__description {
            color: gray;
            margin-bottom: 1rem;
          }

          .t-content__button {
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class NotFoundPageComponent {}
