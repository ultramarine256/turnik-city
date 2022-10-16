import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {
  text: string;
  @Output() confirmationResultEmitter = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any = {}) {}

  ngOnInit(): void {
    this.text = this.dialogData.text;
  }

  confirm(): void {
    this.confirmationResultEmitter.emit(true);
  }
}
