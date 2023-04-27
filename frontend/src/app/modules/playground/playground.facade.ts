import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  catchError,
  finalize,
  first,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { PlaygroundDto, PlaygroundRepository } from 'app/data';
import { DATA_STATE, SnackbarService } from 'app/common';
import { map } from 'rxjs/operators';

const enum AsyncStatus {
  Loading = 'loading',
  Loaded = 'loaded',
}

export function isLoading<T>(asyncResult: AsyncResult<T>): asyncResult is Loading {
  return asyncResult.type === AsyncStatus.Loading;
}

export function isLoaded<T>(asyncResult: AsyncResult<T>): asyncResult is Loaded<T> {
  return asyncResult.type === AsyncStatus.Loaded;
}

type Loading = { type: AsyncStatus.Loading };
type Loaded<T> = { type: AsyncStatus.Loaded; data: T };
type AsyncResult<T = unknown> = Loaded<T> | Loading;

function loaded<T = unknown>(data: T): Loaded<T> {
  return {
    type: AsyncStatus.Loaded,
    data,
  };
}

function loading(): Loading {
  return {
    type: AsyncStatus.Loading,
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlaygroundFacade {
  readonly list$ = new BehaviorSubject<PlaygroundDto[]>([]);
  private readonly selectedPlaygroundId = new BehaviorSubject<number>(0);
  readonly selectedPlayground$ = this.selectedPlaygroundId.pipe(
    switchMap(id => this.get(id)),
    map(data => loaded<PlaygroundDto>(data)),
    startWith(loading()),
    catchError(e => throwError(e))
  );

  // fields
  readonly details$: ReplaySubject<PlaygroundDto> = new ReplaySubject<PlaygroundDto>();

  // status
  readonly status$: ReplaySubject<DATA_STATE> = new ReplaySubject<DATA_STATE>();

  constructor(private repository: PlaygroundRepository, private snackBar: SnackbarService) {}

  // query
  fetch() {
    this.status$.next('loading');
    return this.repository.query().pipe(
      first(),
      finalize(() => this.status$.next('loaded')),
      tap(r => this.list$.next(r))
    );
  }

  // crud
  get(id: number): Observable<PlaygroundDto> {
    this.status$.next('loading');
    return this.repository.get(id).pipe(
      first(),
      finalize(() => this.status$.next('loaded'))
    );
  }

  getBySlug(slug: string): Observable<PlaygroundDto> {
    this.status$.next('loading');
    return this.repository.getBySlug(slug).pipe(
      first(),
      tap(r => this.details$.next(r)),
      finalize(() => this.status$.next('loaded'))
    );
  }

  create(dto: any): Observable<PlaygroundDto> {
    this.status$.next('updating');
    return this.repository.create(dto).pipe(
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
      finalize(() => this.status$.next('loaded'))
    );
  }

  update(dto: any): Observable<PlaygroundDto> {
    this.status$.next('updating');
    return this.repository.update(dto).pipe(
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
      finalize(() => this.status$.next('loaded'))
    );
  }

  /// helpers
}
