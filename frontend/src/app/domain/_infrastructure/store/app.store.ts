import { Injectable } from '@angular/core';
import { CommonRepository, PlaygroundRepository } from '@turnik/data';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  readonly ipDetails$ = this.commonRepository.ipDetails();
  readonly counters$ = this.commonRepository.counters();
  readonly markers$ = this.playgroundRepository.markers();
  readonly playgrounds$ = this.playgroundRepository.query('?top=25&orderby=createdUtc desc');

  readonly vm$ = combineLatest([this.ipDetails$]).pipe(map(([ipDetails]) => ({ ipDetails })));

  constructor(private commonRepository: CommonRepository, private playgroundRepository: PlaygroundRepository) {}
}
