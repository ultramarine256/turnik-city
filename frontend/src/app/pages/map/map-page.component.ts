import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaygroundRepository } from '../../data/playground/playground.repository';

export type UserPosition = {
  lat: number;
  long: number;
};

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  private readonly playgrounds$ = this.playgroundRepository.query('?top=25&orderby=createdUtc desc');
  private readonly markers$ = this.playgroundRepository.markers().pipe();
  private readonly userPosition$ = this.getUserPosition();
  readonly vm$ = combineLatest([this.playgrounds$, this.markers$, this.userPosition$]).pipe(
    map(([playgrounds, markers, userPosition]) => ({ playgrounds, markers, userPosition }))
  );

  constructor(private playgroundRepository: PlaygroundRepository) {}

  private getUserPosition(): Observable<UserPosition> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition((position: any) => {
        observer.next({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        observer.complete();
      });
    });
  }
}
