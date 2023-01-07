import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade, UserFacade } from 'app/domain';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private authFacade: AuthFacade, public userFacade: UserFacade, private route: ActivatedRoute) {}

  ngOnInit() {
    // angryshrimp64

    this.route.params.pipe(first()).subscribe(params => {
      this.userFacade.fetchUserProfile(params['slug']).pipe(first()).subscribe();
    });
  }
}
