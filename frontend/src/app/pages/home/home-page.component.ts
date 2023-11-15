import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AppStore, Auth0Facade } from 'app/modules';
import { AuthService } from '@auth0/auth0-angular';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  cities = ['Kiev', 'Kharkov', 'Odessa', 'Dnipro', 'Zaporizhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Vinnytsia', 'Cherkasy'];

  constructor(
    public readonly facade: AppStore,
    protected readonly auth: Auth0Facade,
    public auth2: AuthService,
  ) {}

  ngOnInit() {
    // pipe(untilDestroyed(this))
  }
}
