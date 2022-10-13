import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlaygroundFacade, SeoService } from '@turnik/domain';

@Component({
  selector: 'app-map-page',
  templateUrl: './playground-map-page.component.html',
  styleUrls: ['./playground-map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapPageComponent implements OnInit {
  constructor(public facade: PlaygroundFacade) {}

  ngOnInit() {}
}
