import { Component, OnInit } from '@angular/core';
import { Auth0Facade, UserFacade } from 'app/modules';
import { toAsyncState } from '../../common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user$ = this.auth0Facade.user.pipe(toAsyncState());

  constructor(
    public readonly auth0Facade: Auth0Facade,
    public readonly facade: UserFacade,
  ) {}

  ngOnInit() {
    // const slug = this.route.snapshot.paramMap.get('slug') || '';
    // this.facade.fetchProfile(slug).pipe(first()).subscribe();
  }
}
