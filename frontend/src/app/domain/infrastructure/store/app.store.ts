import { Injectable } from '@angular/core';
import { CommonRepository } from '@turnik/data';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  private readonly ipDetails$ = this.commonRepository.ipDetails();

  readonly vm$ = combineLatest([this.ipDetails$]).pipe(map(([ipDetails]) => ({ ipDetails })));

  constructor(private commonRepository: CommonRepository) {}
}
