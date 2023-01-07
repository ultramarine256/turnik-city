import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private matSnackBar: MatSnackBar) {}

  error(message: string) {
    this.matSnackBar.open(message, 'X', {
      duration: 12 * 1000,
      panelClass: 'doodle-class',
      horizontalPosition: 'right',
    });
  }
}
