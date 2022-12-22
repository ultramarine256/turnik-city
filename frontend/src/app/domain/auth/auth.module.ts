import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { LoginDialogComponent, AuthFacade } from './index';
import { DataModule } from 'app/data';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [AppCommonModule, DataModule, CommonModule],
  exports: [LoginDialogComponent],
  providers: [AuthFacade],
})
export class AuthModule {}
