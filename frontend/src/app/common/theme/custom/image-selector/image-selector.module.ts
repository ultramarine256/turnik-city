import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFontAwesomeModule, MaterialThemeModule } from '../../libs';
import { ImageSelectorComponent } from './image-selector.component';

@NgModule({
  imports: [CommonModule, MaterialThemeModule, AppFontAwesomeModule],
  declarations: [ImageSelectorComponent],
  exports: [ImageSelectorComponent],
})
export class ImageSelectorModule {}
