import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { ObjectExtensions } from 'app/common';
import { map } from 'rxjs/operators';

export abstract class CrudRepository<T> extends BaseRepository {
  protected pathName: string;

  protected constructor(httpClient: HttpClient, pathName: string) {
    super(httpClient);
    this.pathName = pathName;
  }

  /// crud
  query(query: string = ''): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiBaseUrl}/${this.pathName}${query}`);
  }

  get(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.apiBaseUrl}/${this.pathName}/${id}`);
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

  /// TODO: refactor to use `query` method
  getBySlug(slug: string): Observable<T> {
    return this.httpClient.get<T[]>(`${this.apiBaseUrl}/${this.pathName}?filter=slug eq '${slug}'`).pipe(
      map(r => {
        if (r.length == 0) {
          throw new Error('not-found'); // TODO: specify `not-found` exception
        }
        return r[0];
      }),
    );
  }
}
