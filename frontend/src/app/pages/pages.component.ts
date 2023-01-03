import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { ExtendedDialogService, SOCIAL } from 'app/common';
import { AppStore, AuthFacade, PlaygroundCreateComponent, PlaygroundFacade } from 'app/domain';
import { PlaygroundCreateDto, PlaygroundSizes, PlaygroundTypes } from 'app/data';

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
    public store: AppStore,
    private dialogService: ExtendedDialogService,
    public playgroundFacade: PlaygroundFacade,
    public authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.refreshIdentityInfo();
  }

  playgroundCreateDialogOpen() {
    this.authFacade.isAuthorized$.subscribe(r => {
      console.log(r);
    });

    const model: PlaygroundCreateDto = { size: '', type: '', lat: 0, lng: 0, imageUrls: [] };

    this.dialogService
      .openCreateDialog<PlaygroundCreateDto>(PlaygroundCreateComponent, model, {
        panelClass: 'playground-create-dialog',
        types: PlaygroundTypes,
        sizes: PlaygroundSizes,
        center: this.center$,
      })
      .subscribe(x => this.playgroundFacade.create(x).subscribe().unsubscribe());

    const x: PlaygroundCreateDto = { size: '', type: '', lat: 0, lng: 0, imageUrls: [] };
    this.playgroundFacade.create(x).subscribe(r => {
      console.log(r);
    });
  }

  loginClick() {
    this.authFacade.openLoginDialog();
  }

  navigateToProfile() {
    this.router.navigate(['/profile']).then();
    // profile
    console.log('profile');
  }
}
