import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/location/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent {
  @Output() selectedCityChanged = new EventEmitter<string>();

  readonly cityCtrl = new FormControl('');

  cities$ = this.cityCtrl.valueChanges.pipe(
    debounceTime(200),
    switchMap((value) =>
      !value ? of([]) : this.locationService.cities(value)
    ),
    startWith([])
  );

  constructor(private locationService: LocationService) {}

  onCitySelected() {
    this.selectedCityChanged.emit(
      pipe(
        this.cityCtrl.value,
        O.fromNullable,
        O.getOrElse(() => '')
      )
    );
  }

  clear() {
    this.cityCtrl.setValue('');
    this.selectedCityChanged.emit('');
  }

  displayWith(city: string | null): string {
    return pipe(
      city,
      O.fromNullable,
      O.getOrElse(() => '')
    );
  }
}
