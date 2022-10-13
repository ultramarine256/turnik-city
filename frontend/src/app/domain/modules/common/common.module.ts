import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoodleComponent } from './components/doodle.component';

const COMPONENTS = [DoodleComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [...COMPONENTS],
})
export class AppCommonModule {}
