import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { map } from 'rxjs/operators';
import { IMappable } from './_abstract';
import { ObjectExtensions } from 'app/common';

export abstract class CrudRepository<T extends IMappable> extends BaseRepository {
  protected pathName: string;
  type: new () => T;

  protected constructor(httpClient: HttpClient, type: new () => T, pathName: string) {
    super(httpClient);
    this.pathName = pathName;
    this.type = type;
  }

  query(query: string, reset: boolean = false): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.apiBaseUrl}/${this.pathName}${query}`, {
        headers: new HttpHeaders({ reset: reset ? 'y' : '' }),
      })
      .pipe(map(items => items.map(r => new this.type().mapFromJson(r))));
  }

  get(id: number, reset: boolean = false): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiBaseUrl}/${this.pathName}/${id}`, {
        headers: new HttpHeaders({ reset: reset ? 'y' : '' }),
      })
      .pipe(map(json => new this.type().mapFromJson(json)));
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
