import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playground } from './dtos/playgorund';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  items(): Observable<Playground[]> {
    return this.http.get<Playground[]>(`${this.apiBaseUrl}/playground`);
  }
}
