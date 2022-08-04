import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputModule } from '@taiga-ui/kit';
import { LocationAutocompleteComponent } from './location-autocomplete.component';

@NgModule({
  declarations: [LocationAutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiPrimitiveTextfieldModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiLetModule,
  ],
  exports: [LocationAutocompleteComponent],
})
export class LocationAutocompleteModule {}
