import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { ObjectExtensions } from 'app/common';

export abstract class CrudRepository<T> extends BaseRepository {
  protected pathName: string;

  protected constructor(httpClient: HttpClient, pathName: string) {
    super(httpClient);
    this.pathName = pathName;
  }

  query(query: string, reset: boolean = false): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiBaseUrl}/${this.pathName}${query}`, {
      headers: new HttpHeaders({ reset: reset ? 'y' : '' }),
    });
  }

  get(id: number, reset: boolean = false): Observable<T> {
    return this.httpClient.get<T>(`${this.apiBaseUrl}/${this.pathName}/${id}`, {
      headers: new HttpHeaders({ reset: reset ? 'y' : '' }),
    });
  }

  create(json: T): Observable<T> {
    ObjectExtensions.clean(json);
    return this.httpClient.post<T>(`${this.apiBaseUrl}/${this.pathName}`, json);
  }

  update(json: T): Observable<T> {
    ObjectExtensions.clean(json);
    return this.httpClient.put<T>(`${this.apiBaseUrl}/${this.pathName}`, json);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiBaseUrl}/${this.pathName}/${id}`);
  }
}
