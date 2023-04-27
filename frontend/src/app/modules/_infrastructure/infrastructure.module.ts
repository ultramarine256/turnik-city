import { NgModule } from '@angular/core';
import { DataModule } from 'app/data';
import { InterceptorsModule } from './interceptors';
import { SeoService } from './services';

@NgModule({
  declarations: [],
  imports: [InterceptorsModule, DataModule],
  exports: [InterceptorsModule],
  providers: [SeoService],
})
export class InfrastructureModule {}
