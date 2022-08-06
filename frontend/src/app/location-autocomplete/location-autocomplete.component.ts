import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CitiesService } from 'src/app/cities.service';

class CityViewModel {
  constructor(readonly city: string, readonly country: string) {}

  toString(): string {
    return `${this.country}, ${this.city}`;
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

  readonly cities$: Observable<readonly CityViewModel[] | null> =
    this.search$.pipe(
      switchMap((search) =>
        this.serverRequest(search).pipe(
          startWith<readonly CityViewModel[] | null>(null)
        )
      )
    );

  readonly selectedCity = new FormControl(null);

  constructor(private citiesService: CitiesService) {}

  onSearchChange(searchQuery: string | null): void {
    this.search$.next(searchQuery || '');
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  private serverRequest(
    searchQuery: string | null
  ): Observable<CityViewModel[]> {
    return this.citiesService
      .cities(searchQuery || '')
      .pipe(
        map((cities) =>
          cities.map((city) => new CityViewModel(city.title, city.country))
        )
      );
  }
}
