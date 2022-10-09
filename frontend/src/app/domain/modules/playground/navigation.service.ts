import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type UserPosition = {
  lat: number;
  lng: number;
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  getUserPosition(): Observable<UserPosition> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(position => {
        observer.next({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        observer.complete();
      });
    });
  }
}
