import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type City = {
  id: string;
  title: string;
  country: string;
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // TODO: extract to separate API service or create interceptor for apiBaseUrl
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  cities(query: string) {
    return this.http.get<readonly City[]>(
      `${this.apiBaseUrl}/cities?search=${query}`
    );
  }
}
