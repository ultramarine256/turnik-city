import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type City = {
  id: string;
  title: string;
  country: string;
};

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  // TODO: extract to separate API service or create interceptor for apiBaseUrl
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    console.log('http cities', http);
  }

  cities(query: string): Observable<readonly City[]> {
    return this.http.get<readonly City[]>(
      `${this.apiBaseUrl}/cities?search=${query}`
    );
  }
}
