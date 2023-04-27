import { Injectable } from '@angular/core';
import { combineLatest, share } from 'rxjs';
import { CommonRepository, PlaygroundRepository } from 'app/data';
import { toAsyncState } from 'app/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DomainFacade {
  readonly ipDetails$ = this.commonRepository.ipDetails().pipe(share());
  readonly markers$ = this.playgroundRepository.markers().pipe(share());
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
    share()
  );

  constructor(private commonRepository: CommonRepository, private playgroundRepository: PlaygroundRepository) {}
}
