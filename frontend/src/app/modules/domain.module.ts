import { NgModule } from '@angular/core';
import { AuthModule, DomainFacade, InfrastructureModule, PlaygroundModule, UserModule } from './index';

const MODULES = [InfrastructureModule, PlaygroundModule, UserModule, AuthModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [DomainFacade],
})
export class DomainModule {}
