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
import { CitiesService } from 'src/app/location/cities.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent {
  @Output() cityChanged = new EventEmitter<string>();

  readonly cityCtrl = new FormControl('');

  cities$ = this.cityCtrl.valueChanges.pipe(
    debounceTime(200),
    switchMap((value) => (!value ? of([]) : this.citiesService.cities(value))),
    startWith([])
  );

  constructor(private citiesService: CitiesService) {}

  onCitySelected() {
    this.cityChanged.emit(
      pipe(
        this.cityCtrl.value,
        O.fromNullable,
        O.getOrElse(() => '')
      )
    );
  }

  clear() {
    this.cityCtrl.setValue('');
    this.cityChanged.emit('');
  }

  displayWith(city: string | null): string {
    return pipe(
      city,
      O.fromNullable,
      O.getOrElse(() => '')
    );
  }
}
