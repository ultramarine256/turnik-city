import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
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

  create(playground: Partial<Playground>): Observable<Playground> {
    return this.http.post<Playground>(
      `${this.apiBaseUrl}/playground`,
      playground
    );
  }

  update(playgorund: Playground): Observable<Playground> {
    console.log('update', playgorund);
    return of(playgorund).pipe(delay(1000));
    // return this.http.put<Playground>(
    //   `${this.apiBaseUrl}/playground/${playgorund._id}`,
    //   playgorund
    // );
  }

  remove(id: string) {
    console.log('delete', id);

    return of({}).pipe(delay(1000));
    // return this.http.delete(`${this.apiBaseUrl}/playground/${id}`);
  }
}
