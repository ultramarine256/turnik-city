import { FormGroup } from '@angular/forms';

export interface IFormComponent<T> {
  createModelFromForm(model: T, formGroup: FormGroup): T;
  createFormFromModel(model: T): FormGroup;
}

export interface IDialogComponent<T> {
  crudMode: string;
  entity: T;
}
