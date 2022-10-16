import { FormGroup } from '@angular/forms';
import { OnInit, Directive, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUD_ACTION, IDialogComponent, IValidableComponent } from '.';

@Directive()
export abstract class BaseDialogComponent<T> implements OnInit, IValidableComponent<T>, IDialogComponent<T> {
  crudMode: string;
  entity: T;
  customData: Partial<any> = {};

  CRUD_ACTION = CRUD_ACTION;
  form: FormGroup;

  protected constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any = {},
    public dialogRef: MatDialogRef<BaseDialogComponent<T>>
  ) {}

  ngOnInit(): void {
    this.crudMode = this.dialogData.crudMode;
    this.entity = this.dialogData.entity;

    // init form
    this.form = this.createForm(this.entity);
    this.crudMode === this.CRUD_ACTION.DETAILS && this.form.disable();
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }

  initModelFromFormGroup(model: T, formGroup: FormGroup): T {
    throw new Error('');
  }

  createForm(model: T): FormGroup {
    return new FormGroup({});
  }
}
