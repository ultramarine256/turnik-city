import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'app/common';
import { PlaygroundCreateDto } from 'app/data';

@Component({
  selector: 'app-playground-create',
  styles: [
    `
      .map-component {
        width: 100%;
        height: 300px;
        display: flex;
      }
    `,
  ],
  templateUrl: './playground-create.component.html',
})
export class PlaygroundCreateComponent extends BaseDialogComponent<PlaygroundCreateDto> implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      model: PlaygroundCreateDto;
      types: { title: string; slug: string }[];
      sizes: { title: string; slug: string }[];
      center: Observable<{ lat: number; lng: number }>;
    },
    public override dialogRef: MatDialogRef<BaseDialogComponent<PlaygroundCreateDto>>
  ) {
    super('create', data.model, dialogRef);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  public newMarkerAdded(e: any) {
    this.form.patchValue({ lat: e.lat });
    this.form.patchValue({ lng: e.lng });
  }

  public imagesAdded(images: string[]) {
    this.form.patchValue({ imageUrls: images });
  }

  override closeDialog() {
    if (!this.validationHelper.validateForm(this.form)) {
      return;
    }

    const data = this.createModelFromForm(this.entity, this.form);
    super.closeDialog(data);
  }

  createModelFromForm(model: PlaygroundCreateDto, formGroup: FormGroup): PlaygroundCreateDto {
    return {
      ...model,
      lat: formGroup.value.lat,
      lng: formGroup.value.lng,
      imageUrls: formGroup.value.imageUrls,
      size: formGroup.value.size,
      type: formGroup.value.type,
    };
  }

  createFormFromModel(model: PlaygroundCreateDto): FormGroup {
    return new FormGroup({
      lat: new FormControl(model.lat, [Validators.required]),
      lng: new FormControl(model.lng, [Validators.required]),
      imageUrls: new FormControl(model.imageUrls, [Validators.required]),
      size: new FormControl(model.size, [Validators.required]),
      type: new FormControl(model.type, [Validators.required]),
    });
  }
}
