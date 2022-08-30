import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaygroundService } from '../services/playground.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private playgrounds$ = this.playgroundService.items();

  readonly vm$ = combineLatest([this.playgrounds$]).pipe(
    map(([playgrounds]) => ({ playgrounds }))
  );

  constructor(private playgroundService: PlaygroundService) {}
}
