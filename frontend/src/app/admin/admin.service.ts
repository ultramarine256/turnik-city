import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Playground } from '../domain/playground/playgorund';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    console.log('http places', http);
  }

  playgrounds(): Observable<readonly Playground[]> {
    return this.http.get<readonly Playground[]>(
      `${this.apiBaseUrl}/playground`
    );
  }
}
