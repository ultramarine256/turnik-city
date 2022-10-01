import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  error(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 12 * 1000,
      panelClass: 'doodle-class',
      horizontalPosition: 'right',
    });
  }
}
