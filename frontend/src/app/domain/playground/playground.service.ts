import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playground } from './playgorund';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundService {
  // TODO: extract to separate API service or create interceptor for apiBaseUrl
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    console.log('http places', http);
  }

  items(): Observable<readonly Playground[]> {
    return this.http.get<readonly Playground[]>(
      `${this.apiBaseUrl}/playground`
    );
  }
}
