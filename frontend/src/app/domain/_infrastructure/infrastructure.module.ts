import { NgModule } from '@angular/core';
import { DataModule } from 'app/data';
import { InterceptorsModule } from './interceptors';
import { SeoService } from './services';
import { AppStore } from './store/app.store';

@NgModule({
  declarations: [],
  imports: [InterceptorsModule, DataModule],
  exports: [InterceptorsModule],
  providers: [SeoService, AppStore],
})
export class InfrastructureModule {}
