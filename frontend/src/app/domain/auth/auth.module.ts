import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { LoginDialogComponent, AuthFacade } from './index';
import { DataModule } from 'app/data';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [AppCommonModule, DataModule],
  exports: [LoginDialogComponent],
  providers: [AuthFacade],
})
export class AuthModule {}
