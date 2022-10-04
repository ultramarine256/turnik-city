import { NgModule } from '@angular/core';
import { PlaygroundRepository } from './playground/playground.repository';
import { UserRepository } from './user/user.repository';

@NgModule({
  imports: [],
  declarations: [],
  providers: [PlaygroundRepository, UserRepository],
})
export class RepositoryModule {}
