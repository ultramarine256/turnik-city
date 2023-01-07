import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonRepository, PlaygroundRepository } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  readonly ipDetails$ = this.commonRepository.ipDetails();
  readonly counters$ = this.commonRepository.counters();
  readonly markers$ = this.playgroundRepository.markers();

  readonly newMembers$ = this.commonRepository.newMembers();
  readonly newPlaygrounds$ = this.commonRepository.newPlaygrounds();

  readonly vm$ = combineLatest([this.ipDetails$, this.newMembers$, this.newPlaygrounds$]).pipe(
    map(([ipDetails, newMembers, newPlaygrounds]) => ({
      ipDetails: ipDetails,
      newMembers: newMembers,
      newPlaygrounds: newPlaygrounds,
    }))
  );

  constructor(private commonRepository: CommonRepository, private playgroundRepository: PlaygroundRepository) {}
}
