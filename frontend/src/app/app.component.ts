import { Component } from '@angular/core';
import { of, Subject, switchMap } from 'rxjs';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedCity = new Subject<string>();

  places$ = this.selectedCity
    .asObservable()
    .pipe(
      switchMap((city) =>
        !city.length ? of([]) : this.placesService.places(city)
      )
    );

  constructor(private placesService: PlacesService) {}

  onSelectedCityChanged(city: string) {
    this.selectedCity.next(city);
  }
}
