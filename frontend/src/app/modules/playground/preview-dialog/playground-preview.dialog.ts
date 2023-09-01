import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlaygroundDto } from 'app/data';

@Component({
  selector: 'app-playground-preview',
  template: `
    <!--    <ng-template #loading>-->
    <!--      <div class="details-progress__wrapper">-->
    <!--        <mat-progress-bar mode="indeterminate"></mat-progress-bar>-->
    <!--      </div>-->
    <!--    </ng-template>-->
    <!--    <div class="details" *ngIf="entity$ | async as vm; else loading">-->
    <!--      <swiper class="details__carousel" [config]="swiperOptions">-->
    <!--        <ng-template swiperSlide *ngFor="let item of vm.imageUrls">-->
    <!--          <img [src]="item" alt="" class="my-slider-image" />-->
    <!--        </ng-template>-->
    <!--      </swiper>-->
    <!--      <div class="l-body">-->
    <!--        <h4 class="l-body__title">#{{ vm.id }} {{ vm.size }} {{ vm.type }}</h4>-->
    <!--        <div class="l-body__added">{{ vm.createdUtc | date : 'd MMM yyyy' }}</div>-->
    <!--        <div class="c-actions">-->
    <!--          <div class="c-actions__item">-->
    <!--            <fa-icon class="t-action__icon" [icon]="['far', 'heart']" size="lg"></fa-icon>-->
    <!--            <span>{{ vm.likesCount }}</span>-->
    <!--          </div>-->
    <!--          <div class="c-actions__item">-->
    <!--            <fa-icon class="t-action__icon" [icon]="['far', 'eye']" size="lg"></fa-icon>-->
    <!--            <span>{{ vm.viewsCount }}</span>-->
    <!--          </div>-->
    <!--          <div class="c-actions__item">-->
    <!--            <fa-icon class="t-action__icon" [icon]="['far', 'comment']" size="lg"></fa-icon>-->
    <!--            <span>{{ vm.viewsCount }}</span>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
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

      /* ACTIONS */
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
  entity$ = this.data.entity;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entity: Observable<PlaygroundDto> }) {
    this.entity$.subscribe(r => {});
  }
}
