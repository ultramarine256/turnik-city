import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { LoginDialog, AuthFacade, RegisterationDialog, ConfirmationCodeDialog } from './index';
import { DataModule } from 'app/data';

@NgModule({
  declarations: [LoginDialog, RegisterationDialog, ConfirmationCodeDialog],
  imports: [AppCommonModule, DataModule],
  exports: [LoginDialog, RegisterationDialog, ConfirmationCodeDialog],
  providers: [AuthFacade],
})
export class AuthModule {}
