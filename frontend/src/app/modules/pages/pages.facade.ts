import { Injectable } from '@angular/core';
import { combineLatest, share } from 'rxjs';
import { map } from 'rxjs/operators';
import { toAsyncState } from 'app/common';
import { CommonRepository, PlaygroundRepository } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class PagesFacade {
  // properties
  readonly markers$ = this.playgroundRepository.markers();
  readonly ipDetails$ = this.commonRepository.ipDetails();

  // view models
  readonly ipDetailsVm$ = this.ipDetails$.pipe(toAsyncState());
  readonly homePage$ = combineLatest([
    this.ipDetails$.pipe(toAsyncState()),
    this.markers$.pipe(toAsyncState()),
    this.commonRepository.counters().pipe(toAsyncState()),
    this.commonRepository.newMembers().pipe(toAsyncState()),
    this.commonRepository.newPlaygrounds().pipe(toAsyncState()),
  ]).pipe(
    map(([ipDetails, markers, counters, newMembers, newPlaygrounds]) => ({
      ipDetails,
      markers,
      counters,
      newMembers,
      newPlaygrounds,
    })),
    share(),
  );

  constructor(
    private commonRepository: CommonRepository,
    private playgroundRepository: PlaygroundRepository,
  ) {}
}
