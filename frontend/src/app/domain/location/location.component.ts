import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { toAsyncState } from '@ngneat/loadoff';
import { constFalse, flow, identity, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as S from 'fp-ts/lib/string';
import { combineLatest, of } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent implements OnDestroy {
  @Output() selectedCityChanged = new EventEmitter<O.Option<string>>();

  readonly selectedCity = new FormControl('');

  private readonly selectedCityChanged$ = this.selectedCity.valueChanges.pipe(
    startWith('')
  );

  private readonly resetSelectedCity$ = this.selectedCityChanged$.pipe(
    map(flow(O.fromNullable, O.map(S.isEmpty), O.getOrElse(constFalse))),
    filter(identity),
    tap(() => this.selectedCityChanged.emit(O.none))
  );

  private readonly cities$ = this.selectedCityChanged$.pipe(
    debounceTime(200),
    switchMap((value) =>
      !value
        ? of([]).pipe(toAsyncState())
        : this.locationService.cities(value).pipe(toAsyncState())
    )
  );

  readonly vm$ = combineLatest([this.cities$]).pipe(
    map(([cities]) => ({ cities }))
  );

  private resetSelectedCitySubscription = this.resetSelectedCity$.subscribe();

  constructor(private locationService: LocationService) {}

  ngOnDestroy() {
    this.resetSelectedCitySubscription.unsubscribe();
  }

  onCitySelected() {
    this.selectedCityChanged.emit(
      pipe(this.selectedCity.value, O.fromNullable)
    );
  }

  clear() {
    this.selectedCity.setValue('');
    this.selectedCityChanged.emit(O.none);
  }

  displayWith(city: string | null): string {
    return pipe(
      city,
      O.fromNullable,
      O.getOrElse(() => '')
    );
  }
}
