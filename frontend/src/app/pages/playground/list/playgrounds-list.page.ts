import { Component, OnInit } from '@angular/core';
import { PlaygroundFacade } from 'app/domain';

@Component({
  selector: 'app-playground-list-page',
  templateUrl: './playgrounds-list.page.html',
  styleUrls: ['./playgrounds-list.page.scss'],
})
export class PlaygroundsListPage implements OnInit {
  constructor(public facade: PlaygroundFacade) {}

  ngOnInit() {}
}
