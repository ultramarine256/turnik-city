import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaygroundRepository } from '@turnik/data';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent implements OnInit {
  // private playgrounds$ = this.playgroundService.items();
  // readonly vm$ = combineLatest([this.playgrounds$]).pipe(map(([playgrounds]) => ({ playgrounds })));

  public playgrounds$ = this.playgroundRepository.query('?top=10');
  public markers$ = this.playgroundRepository.query('');

  constructor(private playgroundRepository: PlaygroundRepository) {}

  ngOnInit() {}
}
