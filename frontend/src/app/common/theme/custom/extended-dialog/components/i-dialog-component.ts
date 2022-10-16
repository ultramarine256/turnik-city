import { FormGroup } from '@angular/forms';

export interface IDialogComponent<T> {
  crudMode: string;
  entity: T;
}

export interface IValidableComponent<T> {
  initModelFromFormGroup(model: T, formGroup: FormGroup): T;
  createForm(model: T): FormGroup;
}
