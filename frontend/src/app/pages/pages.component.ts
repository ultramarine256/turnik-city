import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { filterSuccess, SOCIAL } from 'app/common';
import { AppStore, AuthFacade, PlaygroundPolicyService, UserPolicyService } from 'app/modules';

@Component({
  selector: 'app-pages-component',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  social = SOCIAL;
  readonly center$ = this.store.ipDetails$.pipe(
    filterSuccess(),
    map(r => ({ lat: r.lat, lng: r.lng })),
  );

  constructor(
    public readonly router: Router,
    public readonly store: AppStore,
    public readonly authFacade: AuthFacade,
    public readonly userPolicy: UserPolicyService,
    public readonly playgroundPolicy: PlaygroundPolicyService,
  ) {}

  ngOnInit(): void {
    this.authFacade.refreshIdentityInfo().subscribe();
  }

  playgroundCreateDialogOpen() {
    if (!this.playgroundPolicy.canCreate()) {
      this.authFacade.openLoginDialog();
      return;
    }

    // const model: PlaygroundCreateDto = { size: '', type: '', lat: 0, lng: 0, imageUrls: [] };
    // this.dialogService
    //   .openCreateDialog<PlaygroundCreateDto>(PlaygroundCreateComponent, model, {
    //     panelClass: 'playground-create-dialog',
    //     types: PlaygroundTypes,
    //     sizes: PlaygroundSizes,
    //     center: this.center$,
    //   })
    //   .subscribe(x => {
    //     debugger;
    //     // this.playgroundFacade.create(x).pipe(first()).subscribe();
    //   });

    // const x: PlaygroundCreateDto = { size: '', type: '', lat: 0, lng: 0, imageUrls: [] };
    // this.playgroundFacade.create(x).subscribe(r => {
    //   console.log(r);
    // });
  }

  loginClick() {
    this.authFacade.openLoginDialog();
  }

  profileClick() {
    const userSlug = this.authFacade.identity.slug;
    this.router.navigate([`/profile/${userSlug}`]).then();
  }

  logoutClick() {
    this.authFacade.signOut();
    this.router.navigate(['/']).then();
  }
}
