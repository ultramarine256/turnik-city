import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Playground } from '../../domain/playground/playgorund';

@Component({
  selector: 'app-playground-management',
  templateUrl: './playground-management.component.html',
  styleUrls: ['./playground-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundManagementComponent {
  @Input() playgrounds: readonly Playground[] | undefined = [];
  @Output() selectedPlaygroundChange = new EventEmitter<Playground>();

  selectedPlayground: Playground | undefined;

  select(playground: Playground) {
    this.selectedPlaygroundChange.next(playground);
    this.selectedPlayground = playground;
  }
}
