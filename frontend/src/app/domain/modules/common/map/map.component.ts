import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
}
