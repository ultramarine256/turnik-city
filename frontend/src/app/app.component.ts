import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toAsyncState } from '@ngneat/loadoff';
import * as O from 'fp-ts/lib/Option';
import { combineLatest, of, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly selectedCity = new Subject<O.Option<string>>();

  private readonly places$ = this.selectedCity.asObservable().pipe(
    startWith(O.none),
    switchMap((city) =>
      O.isNone(city)
        ? of([]).pipe(toAsyncState())
        : this.placesService.places(city.value).pipe(toAsyncState())
    )
  );

  readonly vm$ = combineLatest([this.places$]).pipe(
    map(([places]) => ({ places }))
  );

  constructor(private placesService: PlacesService) {}

  onSelectedCityChanged(city: O.Option<string>) {
    this.selectedCity.next(city);
  }
}
