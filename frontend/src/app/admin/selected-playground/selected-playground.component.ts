import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import invariant from 'tiny-invariant';
import { Playground } from '../../domain/playground/playgorund';

enum ViewMode {
  View = 'View',
  Update = 'Update',
}

@Component({
  selector: 'app-selected-playground',
  templateUrl: './selected-playground.component.html',
  styleUrls: ['./selected-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedPlaygroundComponent implements OnChanges {
  @Input() selectedPlayground: Playground | undefined;
  @Input() loading = false;
  @Output() closed = new EventEmitter();
  @Output() updated = new EventEmitter<Playground>();
  @Output() deleted = new EventEmitter<Playground>();

  mode: ViewMode = ViewMode.View;
  playgroundForm = this.fb.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  get isViewMode() {
    return this.mode === ViewMode.View;
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const prev = changes['selectedPlayground']?.previousValue?.['_id'];
    const next = changes['selectedPlayground']?.currentValue?.['_id'];
    if (prev !== next) {
      this.mode = ViewMode.View;
    }
  }

  read() {
    this.mode = ViewMode.View;
  }

  update() {
    invariant(this.selectedPlayground, 'Selected playground is undefined');
    this.mode = ViewMode.Update;
    const { address, city } = this.selectedPlayground;
    this.playgroundForm.patchValue({
      address,
      city,
    });
  }

  remove() {
    this.deleted.emit(this.selectedPlayground);
  }

  submit() {
    const { address, city } = this.playgroundForm.value;
    invariant(address, 'Address field not found');
    invariant(city, 'City field not found');
    invariant(this.selectedPlayground, 'Selected playground is undefined');

    this.updated.emit({
      ...this.selectedPlayground,
      address: address,
      city: address,
    });
  }
}
