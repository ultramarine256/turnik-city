import { Injectable } from '@angular/core';
import { combineLatest, share } from 'rxjs';
import { map } from 'rxjs/operators';
import { toAsyncState } from '../../common';
import { CommonRepository, PlaygroundRepository } from '../../data';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  readonly ipDetails$ = this.commonRepository.ipDetails();
  readonly markers$ = this.playgroundRepository.markers();
  readonly homePage$ = combineLatest([
    this.ipDetails$,
    this.markers$,
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
