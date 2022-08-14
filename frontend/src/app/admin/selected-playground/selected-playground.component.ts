import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    const curr = changes['selectedPlayground']?.currentValue?.['_id'];

    if (prev !== curr) {
      this.mode = ViewMode.View;
    }
  }

  read() {
    this.mode = ViewMode.View;
  }

  update() {
    this.mode = ViewMode.Update;
    this.playgroundForm.patchValue({
      address: this.selectedPlayground?.address,
      city: this.selectedPlayground?.city,
    });
  }

  remove() {
    this.deleted.emit(this.selectedPlayground);
  }

  submit() {
    if (!this.selectedPlayground) return;
    const address = this.playgroundForm.get('address')?.value || '';
    const city = this.playgroundForm.get('city')?.value || '';
    const updatedPlayground = {
      ...this.selectedPlayground,
      address,
      city,
    };
    this.updated.emit(updatedPlayground);
  }
}
