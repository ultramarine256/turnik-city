import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, finalize, Observable, ReplaySubject, tap } from 'rxjs';
import { UserProfileDto, UserRepository } from 'app/data';
import { DATA_STATE, ExtendedDialogService } from 'app/common';
import { Auth0Facade, ProfileDialog } from 'app/modules';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  // streams
  readonly profile$: ReplaySubject<UserProfileDto> = new ReplaySubject<UserProfileDto>();

  // dependencies
  private profileDialogRef: MatDialogRef<ProfileDialog, any>;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly dialogService: ExtendedDialogService,
    private readonly auth0Facade: Auth0Facade,
  ) {}

  fetchProfile(slug: string): Observable<UserProfileDto> {
    return this.userRepository.userProfile(slug).pipe(
      tap(r => this.profile$.next(r)),
      catchError(err => {
        if (err.status === 404) {
        }
        throw err.status;
      }),
      finalize(() => {}),
    );
  }

  fetchUserLocations(slug: string): Observable<UserProfileDto> {
    return new Observable<UserProfileDto>();
  }

  openProfileDialog() {
    // this.auth0Facade.user

    this.profileDialogRef = this.dialogService.openDialog(ProfileDialog, 'login-dialog', {
      model: this.profile$,
    });
    const instance = this.profileDialogRef.componentInstance;

    instance.submitClick.pipe().subscribe((model: UserProfileDto) => {
      console.log(model);
    });
  }
}
