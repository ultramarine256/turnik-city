import { NgModule } from '@angular/core';
import { AuthModule, InfrastructureModule, PlaygroundModule, UserModule } from './index';

const MODULES = [InfrastructureModule, PlaygroundModule, UserModule, AuthModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [],
})
export class DomainModule {}
