import { Injectable } from '@angular/core';
import { combineLatest, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaygroundRepository, CommonRepository } from '@turnik/data';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundFacade {
  private readonly playgrounds$ = this.playgroundRepository.query('?top=25&orderby=createdUtc desc');
  private readonly markers$ = this.playgroundRepository.markers();
  private readonly ipDetails$ = this.commonRepository.ipDetails();

  readonly vm$ = combineLatest([this.playgrounds$, this.markers$, this.ipDetails$]).pipe(
    map(([playgrounds, markers, ipDetails]) => ({ playgrounds, markers, ipDetails }))
  );

  constructor(private playgroundRepository: PlaygroundRepository, private commonRepository: CommonRepository) {}
}
