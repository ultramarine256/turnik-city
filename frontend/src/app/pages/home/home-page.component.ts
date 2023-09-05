import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AppStore } from 'app/modules';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  cities = ['Kiev', 'Kharkov', 'Odessa', 'Dnipro', 'Zaporizhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Vinnytsia', 'Cherkasy'];

  constructor(public readonly facade: AppStore) {}

  ngOnInit() {
    // pipe(untilDestroyed(this))
  }
}
