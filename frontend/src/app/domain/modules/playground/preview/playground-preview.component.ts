import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaygroundDto } from '@turnik/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground-preview',
  templateUrl: './playground-preview.component.html',
  styleUrls: ['./playground-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundPreviewComponent {
  entity$ = this.data.entity;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entity: Observable<PlaygroundDto> }) {}
}
