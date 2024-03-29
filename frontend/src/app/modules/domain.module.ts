import { NgModule } from '@angular/core';
import { AuthModule, InfrastructureModule, PlaygroundModule, UserModule } from './index';

const MODULES = [InfrastructureModule, PlaygroundModule, UserModule, AuthModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class DomainModule {}
