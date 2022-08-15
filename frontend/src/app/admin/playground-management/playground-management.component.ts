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
  @Input() selectedPlayground: Playground | undefined;
  @Input() loading = false;
  @Output() selectedPlaygroundChange = new EventEmitter<Playground>();
  @Output() loadMore = new EventEmitter();

  select(playground: Playground) {
    this.selectedPlaygroundChange.next(playground);
  }
}
