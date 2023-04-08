import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ExtendedDialogService, SOCIAL } from 'app/common';
import { AuthFacade, DomainFacade, PlaygroundFacade, PlaygroundPolicyService, UserPolicyService } from 'app/domain';
import { PlaygroundCreateDto } from 'app/data';

@Component({
  selector: 'app-pages-component',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  social = SOCIAL;
  readonly center$ = this.store.ipDetails$.pipe(map(r => ({ lat: r.lat, lng: r.lng })));

  constructor(
    public router: Router,
    public store: DomainFacade,
    private dialogService: ExtendedDialogService,
    public playgroundFacade: PlaygroundFacade,
    public authFacade: AuthFacade,
    public userPolicy: UserPolicyService,
    public playgroundPolicy: PlaygroundPolicyService
  ) {}

  ngOnInit(): void {
    this.authFacade.refreshIdentityInfo().subscribe();
  }

  playgroundCreateDialogOpen() {
    if (!this.playgroundPolicy.canCreate()) {
      this.authFacade.openLoginDialog();
      return;
    }

    // TODO: dude, why are this comments in our code??

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
