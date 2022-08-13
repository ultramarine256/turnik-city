import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Place } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesComponent {
  @Input() places: readonly Place[] = [];
}
