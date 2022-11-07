import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudDialogWrapperComponent, ConfirmationDialogComponent } from './components';
import { ExtendedDialogService } from './extended-dialog.service';
import { AppFontAwesomeModule, MaterialThemeModule } from '../../libs';

@NgModule({
  imports: [CommonModule, MaterialThemeModule, AppFontAwesomeModule],
  declarations: [CrudDialogWrapperComponent, ConfirmationDialogComponent],
  exports: [CrudDialogWrapperComponent],
  providers: [ExtendedDialogService],
  entryComponents: [CrudDialogWrapperComponent, ConfirmationDialogComponent],
})
export class ExtendedDialogModule {}
