import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, finalize, first, tap } from 'rxjs';
import { PlaygroundDto, PlaygroundRepository } from 'app/data';
import { DATA_STATE, SnackbarService } from 'app/common';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundFacade {
  readonly list$ = new BehaviorSubject<PlaygroundDto[]>([]);
  private readonly selectedPlaygroundId = new BehaviorSubject<number>(0);

  // fields
  readonly details$: ReplaySubject<PlaygroundDto> = new ReplaySubject<PlaygroundDto>();

  constructor(
    private repository: PlaygroundRepository,
    private snackBar: SnackbarService,
  ) {}

  // query
  fetch() {
    return this.repository.query().pipe(
      first(),
      tap(r => this.list$.next(r)),
    );
  }

  // crud
  get(id: number): Observable<PlaygroundDto> {
    return this.repository.get(id).pipe(first());
  }

  getBySlug(slug: string): Observable<PlaygroundDto> {
    return this.repository.getBySlug(slug).pipe(
      first(),
      tap(r => this.details$.next(r)),
    );
  }

  create(dto: any): Observable<PlaygroundDto> {
    return this.repository.create(dto).pipe(
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
    );
  }

  update(dto: any): Observable<PlaygroundDto> {
    return this.repository.update(dto).pipe(
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
    );
  }
}
