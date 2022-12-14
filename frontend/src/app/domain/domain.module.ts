import { NgModule } from '@angular/core';
import { AuthModule, InfrastructureModule, PlaygroundModule } from './index';

const MODULES = [InfrastructureModule, PlaygroundModule, AuthModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class DomainModule {}
