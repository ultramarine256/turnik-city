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

  readonly vm$ = combineLatest([this.ipDetails$]).pipe(map(([ipDetails]) => ({ ipDetails })));

  constructor(private commonRepository: CommonRepository, private playgroundRepository: PlaygroundRepository) {}
}
