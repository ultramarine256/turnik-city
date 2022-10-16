import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogComponent, CRUD_ACTION } from './components';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ExtendedDialogService {
  constructor(protected dialog: MatDialog) {}

  openDialog<T>(component: any, data: any = null): Observable<T> {
    const dialogRef = this.dialog.open(component, {
      panelClass: 'preview-dialog',
      data: data,
    });

    // width: '500px',

    // (dialogRef.componentInstance as any).onSubmit.subscribe(async newEntity => {
    //   // bsModalRef.content.entityEmitter.pipe(filter(x => !!x)).subscribe((x: T) => emitter.next(x));
    //   dialogRef.close();
    // });

    // return null;
    return dialogRef.afterClosed().pipe(filter(x => !!x || (x || []).length > 0));
  }

  /**
   * @description Abstract dialog for CRUD operations
   * @param component - Angular Component
   * @param crudMode - 'Create' | 'Update' | 'Delete'
   * @param entity - Entity
   * @param customData - Custom data
   */
  openCrudDialog<T>(
    component: any,
    crudMode: 'Create' | 'Update' | 'Delete',
    entity: T,
    customData: any = {}
  ): Observable<T> {
    component.crudMode = CRUD_ACTION.CREATE;
    const dialogRef = this.dialog.open(component, {
      width: '500px',
      panelClass: 'admin-dialog',
      data: { crudMode, entity, customData },
    });
    return dialogRef.afterClosed().pipe(filter(x => !!x || (x || []).length > 0));
  }

  /**
   * @description Confirmation Dialog
   * @param text - confirmation text
   */
  openConfirmationDialog(text: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      panelClass: 'admin-dialog',
      data: { text: text },
    });

    return dialogRef.afterClosed().pipe(filter(x => x === true));
  }
}

export class AppDialogData<T, V> {
  entity: T;
  customData: V;
}
