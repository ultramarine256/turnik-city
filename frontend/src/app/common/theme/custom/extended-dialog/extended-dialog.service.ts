import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './components';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ExtendedDialogService {
  constructor(protected dialog: MatDialog) {}

  /**
   * @description Abstract dialog for CRUD operations
   * @param component - Angular Component
   * @param panelClass - Panel CSS class
   * @param data - Dialog data
   */
  openDialog(component: any, panelClass: string = '', data: any = null) {
    return this.dialog.open(component, {
      panelClass: panelClass,
      data: data,
    });
  }

  /**
   * @description Abstract dialog for CRUD operations
   * @param component - Angular Component
   * @param model - dialog data
   * @param dependencies - Additional data (dto dependencies)
   */
  openCreateDialog<T>(component: any, model: T, dependencies: any = {}): Observable<T> {
    component.crudMode = 'Create';
    const dialogRef = this.dialog.open(component, {
      width: '500px',
      panelClass: dependencies.panelClass || 'app-dialog',
      data: { model, ...dependencies },
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
      panelClass: 'app-dialog',
      data: { text: text },
    });

    return dialogRef.afterClosed().pipe(filter(x => x === true));
  }
}
