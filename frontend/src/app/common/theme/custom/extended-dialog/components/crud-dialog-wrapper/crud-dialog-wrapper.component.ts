import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-modal-wrapper',
  templateUrl: './crud-dialog-wrapper.component.html',
  styles: [
    `
      .dialog__title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 16px;

        .dialog__close {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          line-height: 24px;
        }
      }

      .dialog__content {
        max-height: 80vh;
        overflow: auto;
      }

      .dialog__actions {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class CrudDialogWrapperComponent {
  @Input() title: string;
  @Input() saveButtonText = 'Save';
  @Input() isProcessing: boolean;
  @Input() crudMode: 'details' | 'create' | 'update';
  @Input() isFormValid: boolean;
  @Input() badgeText: string;
  @Output() saveClick = new EventEmitter();

  CRUD_ACTION = CRUD_ACTION;
}

export enum CRUD_ACTION {
  DETAILS = 'details',
  CREATE = 'create',
  UPDATE = 'update',
}
