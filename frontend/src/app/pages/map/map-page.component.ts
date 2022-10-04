import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlaygroundRepository } from '@turnik/data';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  public playgrounds$ = this.playgroundRepository.query('?top=25&orderby=createdUtc desc');
  public markers$ = this.playgroundRepository.markers().pipe(map(x => x.slice(0, 100)));

  constructor(private playgroundRepository: PlaygroundRepository) {}
}
