import { Component, ViewEncapsulation } from '@angular/core';
import { swiperOptions } from 'app/common';
import { catchError, throwError } from 'rxjs';
import { PlaygroundFacade } from '../playground.facade';

@Component({
  selector: 'app-playground-preview',
  template: `
    <div class="details" *ngIf="playground$ | async as playground">
      <ng-container *ngIf="playground.type === 'loading'">
        <div class="details-progress__wrapper">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
      </ng-container>

      <ng-container *ngIf="playground.type === 'loaded'">
        <swiper class="details__carousel" [config]="swiperOptions">
          <ng-template swiperSlide *ngFor="let item of playground.data.imageUrls">
            <img [src]="item" alt="" class="my-slider-image" />
          </ng-template>
        </swiper>

        <div class="d-body">
          <h4 class="d-body__title">#{{ playground.data.id }} {{ playground.data.size }} {{ playground.data.type }}</h4>
          <div class="d-body__added">{{ playground.data.createdUtc | date: 'd MMM yyyy' }}</div>
          <div class="t-actions">
            <div class="t-actions__item">
              <fa-icon class="t-counter__icon" [icon]="['far', 'heart']" size="lg"></fa-icon>
              <span>{{ playground.data.likes }}</span>
            </div>
            <div class="t-actions__item">
              <fa-icon class="t-counter__icon" [icon]="['far', 'eye']" size="lg"></fa-icon>
              <span>{{ playground.data.views }}</span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      /* DETAILS */
      .details {
        display: flex;
        flex-direction: column;

        .details__carousel {
          width: 100%;
        }
      }

      /* DETAILS BODY */
      .d-body {
        padding: 10px;

        .d-body__title {
          font-weight: 500;
          margin-bottom: 6px;
        }

        .d-body__added {
          color: gray;
          font-size: 90%;
          margin-bottom: 6px;
        }
      }

      /* ACTIONS */
      .t-actions {
        display: flex;
        flex-direction: row;

        .t-actions__item {
          margin-right: 6px;

          .t-counter__icon {
            margin-right: 3px;
          }
        }
      }

      .details-progress__wrapper {
        margin: 15px;
        overflow: hidden;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundPreviewComponent {
  readonly playground$ = this.facade.selectedPlayground$.pipe(
    catchError(e => {
      alert('Error occurred'); // TODO: close modal, show toaster with error
      return throwError(e);
    })
  );

  readonly swiperOptions = swiperOptions;

  constructor(public facade: PlaygroundFacade) {}
}
