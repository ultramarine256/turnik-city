import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { DataModule } from 'app/data';
import { UserFacade } from './user.facade';

@NgModule({
  declarations: [],
  imports: [AppCommonModule, DataModule],
  exports: [],
  providers: [UserFacade],
})
export class UserModule {}
