import { Component, OnInit } from '@angular/core';
import { AppStore } from '@turnik/domain';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public store: AppStore) {}

  ngOnInit() {}
}
