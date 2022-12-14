import { AfterViewInit, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { swiperOptions } from 'app/common';
import { PlaygroundDto } from 'app/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground-preview',
  template: `
    <ng-template #loading>
      <div class="details-progress__wrapper">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
    </ng-template>
    <div class="details" *ngIf="entity$ | async as vm; else loading">
      <swiper class="details__carousel" [config]="swiperOptions">
        <ng-template swiperSlide *ngFor="let item of vm.imageUrls">
          <img [src]="item" alt="" class="my-slider-image" />
        </ng-template>
      </swiper>
      <div class="d-body">
        <h4 class="d-body__title">#{{ vm.id }} {{ vm.size }} {{ vm.type }}</h4>
        <div class="d-body__added">{{ vm.createdUtc | date: 'd MMM yyyy' }}</div>
        <div class="t-actions">
          <div class="t-actions__item">
            <fa-icon class="t-counter__icon" [icon]="['far', 'heart']" size="lg"></fa-icon>
            <span>{{ vm.likes }}</span>
          </div>
          <div class="t-actions__item">
            <fa-icon class="t-counter__icon" [icon]="['far', 'eye']" size="lg"></fa-icon>
            <span>{{ vm.views }}</span>
          </div>
          <div class="t-actions__item">
            <fa-icon class="t-counter__icon" [icon]="['far', 'comment']" size="lg"></fa-icon>
            <span>{{ vm.views }}</span>
          </div>
        </div>
      </div>
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
export class PlaygroundPreviewComponent implements AfterViewInit {
  entity$ = this.data.entity;
  swiperOptions = swiperOptions;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entity: Observable<PlaygroundDto> }) {
    this.entity$.subscribe(r => {});
  }

  ngAfterViewInit() {}
}
