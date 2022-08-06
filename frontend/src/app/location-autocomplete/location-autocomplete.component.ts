import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities.service';

class CityViewModel {
  constructor(readonly city: string, readonly country: string) {}

  toString(): string {
    return `${this.city}`;
  }
}

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent {
  readonly search$: Subject<string> = new Subject();

  readonly cities$: Observable<readonly CityViewModel[]> = this.search$.pipe(
    switchMap((search) =>
      this.serverRequest(search).pipe(startWith<readonly CityViewModel[]>([]))
    )
  );

  readonly selectedCity = new FormControl();

  constructor(private citiesService: CitiesService) {}

  onSearchChange(searchQuery: string): void {
    this.search$.next(searchQuery);
  }

  extractValueFromEvent(event: Event): string {
    return pipe(
      O.fromNullable((event.target as HTMLInputElement)?.value),
      O.getOrElse(() => '')
    );
  }

  private serverRequest(searchQuery: string): Observable<CityViewModel[]> {
    return this.citiesService
      .cities(searchQuery)
      .pipe(
        map((cities) =>
          cities.map((city) => new CityViewModel(city.title, city.country))
        )
      );
  }
}
