import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { LoginDialogComponent, AuthFacade, RegisterDialogComponent } from './index';
import { DataModule } from 'app/data';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginDialogComponent, RegisterDialogComponent],
  imports: [AppCommonModule, DataModule],
  exports: [LoginDialogComponent, RegisterDialogComponent],
  providers: [AuthFacade],
})
export class AuthModule {}
