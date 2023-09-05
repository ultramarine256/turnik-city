import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  template: `
    <div class="img__container">
      <div class="img__item img__add" (click)="file.click()">+</div>
      <ng-container *ngFor="let item of images; let i = index">
        <div class="img__item">
          <div class="img__close" (click)="removeImage(i)">x</div>
          <img class="img__src" [src]="item" alt="" />
        </div>
      </ng-container>
    </div>
    <input #file multiple type="file" style="display: none;" accept="image/png, image/jpeg" (change)="inputChanged($event)" />
  `,
  styles: [
    `
      .img__container {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        height: 100px;

        .img__add {
          display: grid;
          place-content: center;
          padding: 5px 18px;
          background-color: #eee;
          border-radius: 4px;
          cursor: pointer;
        }

        .img__item {
          position: relative;
          margin-right: 8px;
          margin-bottom: 4px;

          .img__close {
            position: absolute;
            height: 18px;
            width: 18px;
            right: 4px;
            background: #fff;
            display: grid;
            place-content: center;
            top: 4px;
            border-radius: 50%;
            box-shadow:
              0 1px 2px rgb(60 64 67 / 30%),
              0 1px 3px 1px rgb(60 64 67 / 15%);
            cursor: pointer;
          }

          .img__src {
            border-radius: 4px;
            overflow: hidden;
            flex-shrink: 0;
            height: 100%;
          }
        }
      }

      .map-component {
        width: 100%;
        height: 300px;
        display: flex;
      }
    `,
  ],
})
export class ImageSelectorComponent {
  @Input() crudMode: 'details' | 'create' | 'update';
  @Output() changed = new EventEmitter<string[]>();

  readonly images: string[] = [];
  readonly allowedExtensions = ['image/jpeg'];

  constructor() {}

  removeImage(i: number) {
    this.images.splice(i, 1);
  }

  inputChanged(event: any) {
    if (event.target.files) {
      for (let file of event.target.files) {
        if (file.size / 1024 > 3000) {
          // todo: file size error
          continue;
        }

        if (!this.allowedExtensions.includes(file.type)) {
          // todo: file type error
          continue;
        }

        const reader = new FileReader();
        reader.onload = e => {
          this.images.push(reader.result as string);
          this.changed.emit(this.images);
        };
        reader.readAsDataURL(file);
      }
    }

    this.changed.emit();
  }
}
