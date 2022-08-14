import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Playground } from '../../domain/playground/playgorund';

type ViewMode = 'READ' | 'UPDATE';

@Component({
  selector: 'app-selected-playground',
  templateUrl: './selected-playground.component.html',
  styleUrls: ['./selected-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedPlaygroundComponent {
  @Input() selectedPlayground: Playground | undefined;
  @Output() closed = new EventEmitter();

  mode: ViewMode = 'READ';

  read() {
    this.mode = 'READ';
  }

  update() {
    this.mode = 'UPDATE';
  }

  remove() {}

  submit() {}
}
