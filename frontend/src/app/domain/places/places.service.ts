import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type Place = {
  id: string;
  title: string;
  address: string;
};

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // TODO: extract to separate API service or create interceptor for apiBaseUrl
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    console.log('http places', http);
  }

  places(city: string): Observable<readonly Place[]> {
    return this.http.get<readonly Place[]>(`${this.apiBaseUrl}/places/${city}`);
  }
}
