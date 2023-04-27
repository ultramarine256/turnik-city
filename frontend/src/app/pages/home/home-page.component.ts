import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomainFacade } from 'app/modules';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  cities = [
    'Kiev',
    'Kharkov',
    'Odessa',
    'Dnipro',
    'Zaporizhia',
    'Lviv',
    'Kryvyi Rih',
    'Mykolaiv',
    'Vinnytsia',
    'Cherkasy',
  ];

  constructor(public facade: DomainFacade) {}
}
