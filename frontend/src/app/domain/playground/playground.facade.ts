import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { PlaygroundRepository, PlaygroundDto } from '@turnik/data';
import { SnackbarService } from '@turnik/common';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundFacade {
  // predicates
  isProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(private playgroundRepository: PlaygroundRepository, private snackBar: SnackbarService) {}

  get(id: number): Observable<PlaygroundDto> {
    return this.playgroundRepository.get(id);
  }

  update(dto: any): Observable<PlaygroundDto> {
    this.isProcessing$.next(true);
    return this.playgroundRepository.update(dto).pipe(
      tap(r => r),
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
      finalize(() => this.isProcessing$.next(false))
    );
  }

  create(dto: any): Observable<PlaygroundDto> {
    this.isProcessing$.next(true);
    return this.playgroundRepository.create(dto).pipe(
      tap(r => r),
      catchError(err => {
        this.snackBar.error(`Error: ${err.status}`);
        throw 'http-status-code: ' + err.status;
      }),
      finalize(() => this.isProcessing$.next(false))
    );
  }
}
