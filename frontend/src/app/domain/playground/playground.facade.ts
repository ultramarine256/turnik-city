import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, first, Observable, tap } from 'rxjs';
import { PlaygroundDto, PlaygroundRepository } from 'app/data';
import { SnackbarService } from 'app/common';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundFacade {
  // fields
  readonly list$ = new BehaviorSubject<PlaygroundDto[]>([]);

  // predicates
  readonly isProcessing$ = new BehaviorSubject<boolean>(false);

  // query
  readonly filters = {
    page: 0,
    pageSize: 0,
  };

  constructor(private repository: PlaygroundRepository, private snackBar: SnackbarService) {}

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

  nextPage() {}

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
