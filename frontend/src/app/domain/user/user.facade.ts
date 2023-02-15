import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, finalize, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { UserProfileDto, UserRepository } from 'app/data';
import { LoginClickEvent, ProfileDialog } from 'app/domain';
import { DATA_STATE, ExtendedDialogService } from 'app/common';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  // streams
  readonly profile$: ReplaySubject<UserProfileDto> = new ReplaySubject<UserProfileDto>();

  // predicates
  readonly profileStatus$: ReplaySubject<DATA_STATE> = new ReplaySubject<DATA_STATE>();
  readonly profileDialogStatus$: ReplaySubject<DATA_STATE> = new ReplaySubject<DATA_STATE>();

  // dependencies
  private profileDialogRef: MatDialogRef<ProfileDialog, any>;

  constructor(private userRepository: UserRepository, private dialogService: ExtendedDialogService) {}

  fetchProfile(slug: string): Observable<UserProfileDto> {
    this.profileStatus$.next('loading');
    return this.userRepository.userProfile(slug).pipe(
      tap(r => this.profile$.next(r)),
      catchError(err => {
        if (err.status === 404) {
          this.profileStatus$.next('not-found');
        }
        throw err.status;
      }),
      finalize(() => this.profileStatus$.next('loaded'))
    );
  }

  fetchUserLocations(slug: string): Observable<UserProfileDto> {
    return new Observable<UserProfileDto>();
  }

  openProfileDialog() {
    this.profileDialogRef = this.dialogService.openDialog(ProfileDialog, 'login-dialog', {});
    const instance = this.profileDialogRef.componentInstance;
    instance.status$ = this.profileDialogStatus$;

    this.profileDialogStatus$.next('loading');
    instance.submitClick
      .pipe(tap(_ => this.profileDialogStatus$.next('updating')))
      .subscribe((model: UserProfileDto) => {
        console.log(model);

        // this.getJwtToken({
        //   email: model.email,
        //   password: model.password,
        //   grantType: AUTH_GRANT_TYPE.EMAIL,
        // })
        //   .pipe(first())
        //   .subscribe(token => {
        //     console.log(123);
        //   })
      });
  }
}
