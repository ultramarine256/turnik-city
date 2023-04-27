import { FormGroup } from '@angular/forms';
import { OnInit, Directive } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IDialogComponent, IFormComponent } from '.';

@Directive()
export abstract class BaseDialogComponent<T> implements OnInit, IFormComponent<T>, IDialogComponent<T> {
  entity: T;
  model: T;
  crudMode: 'details' | 'create' | 'update';
  form: FormGroup;

  protected constructor(
    crudMode: 'details' | 'create' | 'update',
    model: T,
    public dialogRef: MatDialogRef<BaseDialogComponent<T>>
  ) {
    this.crudMode = crudMode;
    this.model = model;
  }

  ngOnInit(): void {
    this.form = this.createFormFromModel(this.model);
    // this.crudMode === this.CRUD_ACTION.DETAILS && this.form.disable();
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }

  abstract createModelFromForm(model: T, formGroup: FormGroup): T;
  abstract createFormFromModel(model: T): FormGroup;
}
