import { Injectable } from '@angular/core';
import { combineLatest, delay, forkJoin, Observable, of, startWith, throttle } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonRepository, IpDetailsDto, PlaygroundRepository } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class DomainFacade {
  readonly ipDetails$ = this.commonRepository.ipDetails();
  readonly counters$ = this.commonRepository.counters();
  readonly markers$ = this.playgroundRepository.markers();

  readonly newMembers$ = this.commonRepository.newMembers();
  readonly newPlaygrounds$ = this.commonRepository.newPlaygrounds();

  readonly vm$ = combineLatest([this.commonRepository.ipDetails(), this.newMembers$, this.newPlaygrounds$]).pipe(
    map(([ipDetails, newMembers, newPlaygrounds]) => {
      return {
        ipDetails: ipDetails,
        newMembers: newMembers,
        newPlaygrounds: newPlaygrounds,
      };
    })
  );

  readonly vm2$: Observable<IpDetailsDto> = combineLatest([this.commonRepository.ipDetails()]).pipe(
    map(([a1]) => {
      return a1;
    })
  );

  readonly c$: Observable<{ a: string; b: MyType }>;

  constructor(private commonRepository: CommonRepository, private playgroundRepository: PlaygroundRepository) {
    // const a$: Observable<string> = of('first').pipe(delay(2000), startWith(''));
    // const b$: Observable<MyType> = of({ x1: 'second', x2: 'aaaah' }).pipe(delay(10));
    // this.c$ = combineLatest([a$, b$]).pipe(
    //   map(([a, b]) => {
    //     console.log(a);
    //
    //     return { a, b };
    //   })
    // );

    // issue

    const a$: Observable<string> = of('test-value');
    const b$: Observable<number> = of(1);
    const c$ = combineLatest([a$, b$]).pipe(map(([a, b]) => ({ a, b })));
  }
}

export type MyType = {
  x1: string;
  x2: string;
};
