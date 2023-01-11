import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, first, Observable, startWith, switchMap, tap, throwError } from 'rxjs';
import { PlaygroundDto, PlaygroundRepository } from 'app/data';
import { SnackbarService } from 'app/common';
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
  readonly isProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(private repository: PlaygroundRepository, private snackBar: SnackbarService) {}

  selectPlayground(id: number) {
    this.selectedPlaygroundId.next(id);
  }

  // query
  fetch() {
    this.isProcessing$.next(true);
    this.repository
      .query()
      .pipe(first())
      .pipe(finalize(() => this.isProcessing$.next(false)))
      .subscribe(r => {
        this.list$.next(r);
      });
  }

  // crud
  get(id: number): Observable<PlaygroundDto> {
    return this.repository.get(id);
  }

  create(dto: any): Observable<PlaygroundDto> {
    this.isProcessing$.next(true);
    return this.repository.create(dto).pipe(
      tap(r => r),
      finalize(() => this.isProcessing$.next(false)),
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      })
    );
  }

  update(dto: any): Observable<PlaygroundDto> {
    this.isProcessing$.next(true);
    return this.repository.update(dto).pipe(
      tap(r => r),
      finalize(() => this.isProcessing$.next(false)),
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      })
    );
  }

  /// helpers
}
