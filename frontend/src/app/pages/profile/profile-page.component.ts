import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade, PermissionChecker } from 'app/domain';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private authFacade: AuthFacade, public router: Router, public permissionChecker: PermissionChecker) {}

  ngOnInit() {}

  logout() {
    this.authFacade.signOut();
    this.router.navigate(['/']).then();
  }
}
