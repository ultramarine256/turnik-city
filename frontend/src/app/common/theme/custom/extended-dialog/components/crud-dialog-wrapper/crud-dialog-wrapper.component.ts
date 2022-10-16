import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-modal-wrapper',
  templateUrl: './crud-dialog-wrapper.component.html',
})
export class CrudDialogWrapperComponent {
  @Input() title: string;
  @Input() saveButtonText = 'Save';
  @Input() isProcessing: boolean;
  @Input() crudMode: string;
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
