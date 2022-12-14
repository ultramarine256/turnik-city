import { Component } from '@angular/core';
import { AppStore } from 'app/domain';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(public store: AppStore) {}
}
