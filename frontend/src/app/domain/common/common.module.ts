import { NgModule } from '@angular/core';
import { DoodleComponent } from './components/doodle.component';
import { ThemeModule } from '@turnik/common';

const COMPONENTS = [DoodleComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ThemeModule],
  exports: [...COMPONENTS],
})
export class AppCommonModule {}
