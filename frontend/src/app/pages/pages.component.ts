import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, PlaygroundCreateComponent, PlaygroundFacade } from '@turnik/domain';
import { ExtendedDialogService, SOCIAL } from '@turnik/common';
import { PlaygroundCreateDto, PlaygroundSizes, PlaygroundTypes } from '@turnik/data';
import { map } from 'rxjs/operators';

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
    public playgroundFacade: PlaygroundFacade
  ) {}

  ngOnInit() {}

  playgroundCreateDialogOpen() {
    const model = new PlaygroundCreateDto();
    this.dialogService
      .openCreateDialog<PlaygroundCreateDto>(PlaygroundCreateComponent, model, {
        panelClass: 'playground-create-dialog',
        types: PlaygroundTypes,
        sizes: PlaygroundSizes,
        center: this.center$,
      })
      .subscribe(x => this.playgroundFacade.create(x).subscribe().unsubscribe());

    // TODO: please, refactor
    // const x = new PlaygroundCreateDto({
    //   size: '',
    //   type: '',
    //   lat: 1,
    //   lng: 1,
    // });
    // this.playgroundFacade.create(x).subscribe(r => {
    //   console.log(r);
    // });
  }
}
