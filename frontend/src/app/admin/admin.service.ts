import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Playground } from '../domain/playground/playgorund';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  playgrounds(page = 1): Observable<Playground[]> {
    return this.http
      .get<Playground[]>(`${this.apiBaseUrl}/playground`)
      .pipe(map((playgrounds) => playgrounds.slice(0, page * 5)));
  }

  create(playground: Partial<Playground>): Observable<Playground> {
    return this.http.post<Playground>(
      `${this.apiBaseUrl}/playground`,
      playground
    );
  }

  update(playgorund: Playground): Observable<Playground> {
    console.log('update', playgorund);
    return of(playgorund).pipe(delay(1000));
  }

  remove(id: string) {
    console.log('delete', id);

    return of({}).pipe(delay(1000));
  }
}
