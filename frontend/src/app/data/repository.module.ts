import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonRepository, UserRepository, PlaygroundRepository } from './index';

@NgModule({
  imports: [HttpClientModule],
  providers: [PlaygroundRepository, UserRepository, CommonRepository],
})
export class RepositoryModule {}
