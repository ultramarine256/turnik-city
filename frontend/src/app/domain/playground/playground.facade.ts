import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  first,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
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
  private readonly selectedPlaygroundId = new BehaviorSubject<number>(0);
  readonly selectedPlayground$ = this.selectedPlaygroundId.pipe(
    switchMap(id => this.repository.get(id)),
    map(data => loaded<PlaygroundDto>(data)),
    startWith(loading())
  );

  constructor(private repository: PlaygroundRepository, private snackBar: SnackbarService) {}

  selectPlayground(id: number) {
    this.selectedPlaygroundId.next(id);
  }

  create(dto: any): Observable<AsyncResult<PlaygroundDto>> {
    return this.repository.create(dto).pipe(
      map(data => loaded<PlaygroundDto>(data)),
      startWith(loading()),
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        return throwError(err);
      })
    );
  }
}
