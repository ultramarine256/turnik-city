import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { UserProfileDto, UserRepository } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  userProfile: UserProfileDto;

  readonly isProfileLoaded$ = new BehaviorSubject(false);
  readonly isUserNotFound$ = new BehaviorSubject(false);

  constructor(private userRepository: UserRepository) {}

  fetchUserProfile(slug: string): Observable<UserProfileDto> {
    this.isProfileLoaded$.next(false);
    return this.userRepository
      .userProfile(slug)
      .pipe(tap(r => (this.userProfile = r)))
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            this.isUserNotFound$.next(true);
          }
          throw err.status;
        })
      )
      .pipe(finalize(() => this.isProfileLoaded$.next(true)));
  }
}
