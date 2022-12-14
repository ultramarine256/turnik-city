import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from 'app/domain';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  constructor(private authFacade: AuthFacade, public router: Router) {}

  logout() {
    this.authFacade.signOut();
    this.router.navigate(['/']).then();
  }
}
