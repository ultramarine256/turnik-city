import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { toAsyncState } from '@ngneat/loadoff';
import { PlaygroundService } from '../domain/playground/playground.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly playgrounds$ = this.playgroundService
    .items()
    .pipe(toAsyncState());

  readonly vm$ = combineLatest([this.playgrounds$]).pipe(
    map(([playgrounds]) => ({ playgrounds }))
  );

  constructor(private playgroundService: PlaygroundService) {}
}
