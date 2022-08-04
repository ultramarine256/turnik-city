import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import {
  delay,
  filter,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

class City {
  constructor(readonly city: string, readonly country: string) {}

  toString(): string {
    return `${this.country}, ${this.city}`;
  }
}

const databaseMockData: readonly City[] = [
  new City(`Kiev`, `Ukraine`),
  new City(`Kharkov`, `Ukraine`),
];

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent {
  readonly search$: Subject<string | null> = new Subject();

  readonly cities$: Observable<readonly City[] | null> = this.search$.pipe(
    filter((value) => value !== null),
    switchMap((search) =>
      this.serverRequest(search).pipe(startWith<readonly City[] | null>(null))
    ),
    startWith(databaseMockData)
  );

  readonly selectedCity = new FormControl(null);

  onSearchChange(searchQuery: string | null): void {
    this.search$.next(searchQuery);
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  private serverRequest(
    searchQuery: string | null
  ): Observable<readonly City[]> {
    const result = databaseMockData.filter((user) =>
      TUI_DEFAULT_MATCHER(user, searchQuery || ``)
    );

    return of(result).pipe(delay(Math.random() * 1000 + 500));
  }
}
