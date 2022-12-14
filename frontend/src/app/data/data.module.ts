import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonRepository, UserRepository, PlaygroundRepository, AuthRepository } from './index';

@NgModule({
  imports: [HttpClientModule],
  providers: [PlaygroundRepository, UserRepository, CommonRepository, AuthRepository],
})
export class DataModule {}
