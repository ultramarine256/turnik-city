import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { DataModule } from 'app/data';
import { UserFacade } from './user.facade';
import { ProfileDialog, TrainingCalendarComponent, UserBulletComponent, UserCircleComponent } from './index';

const COMPONENTS = [ProfileDialog, TrainingCalendarComponent, UserCircleComponent, UserBulletComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [AppCommonModule, DataModule],
  exports: [...COMPONENTS],
  providers: [UserFacade],
})
export class UserModule {}
