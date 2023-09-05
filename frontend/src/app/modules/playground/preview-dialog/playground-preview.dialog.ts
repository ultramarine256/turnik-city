import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlaygroundDto } from 'app/data';
import { AsyncState } from 'app/common';

@Component({
  selector: 'app-playground-preview',
  template: `
    <ng-container *ngIf="data.entity$ | async as entity">
      <!-- state: loading -->
      <div *ngIf="entity.loading" class="details-progress__wrapper">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>

      <!-- state: success -->
      <div *ngIf="entity.success" class="details">
        <div class="c-swiper">
          <!--  <ng-template swiperSlide *ngFor="let item of vm.imageUrls">-->
          <!--    <img [src]="item" alt="" class="my-slider-image" />-->
          <!--  </ng-template>-->
          <!--  TODO: put swiper here-->
        </div>

        <div class="l-body">
          <h4 class="l-body__title">#{{ entity.res?.id }} {{ entity.res?.size }} {{ entity.res?.type }}</h4>
          <div class="l-body__added">{{ entity.res?.createdUtc | date: 'd MMM yyyy' }}</div>
          <div class="c-actions">
            <div class="c-actions__item">
              <fa-icon class="t-action__icon" [icon]="['far', 'heart']" size="lg"></fa-icon>
              <span>{{ entity.res?.likesCount }}</span>
            </div>
            <div class="c-actions__item">
              <fa-icon class="t-action__icon" [icon]="['far', 'eye']" size="lg"></fa-icon>
              <span>{{ entity.res?.viewsCount }}</span>
            </div>
            <div class="c-actions__item">
              <fa-icon class="t-action__icon" [icon]="['far', 'comment']" size="lg"></fa-icon>
              <span>{{ entity.res?.viewsCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .details {
        display: flex;
        flex-direction: column;
      }

      .c-swiper {
        min-height: 300px;
        width: 100%;
        background-color: #6a6a6a;
      }

      .l-body {
        padding: 10px;

        .l-body__title {
          font-weight: 500;
          margin-bottom: 6px;
        }

        .l-body__added {
          color: gray;
          font-size: 90%;
          margin-bottom: 6px;
        }
      }

      .c-actions {
        display: flex;
        flex-direction: row;

        .c-actions__item {
          margin-right: 6px;

          .t-action__icon {
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
export class PlaygroundPreviewDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { entity$: Observable<AsyncState<PlaygroundDto>> }) {}
}
