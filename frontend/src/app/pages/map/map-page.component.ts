import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaygroundRepository } from '../../data/playground/playground.repository';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-map-page',
  template: `
    <ng-template #loading><div class="loading">Loading...</div></ng-template>
    <ng-container *ngIf="vm$ | async as vm; else loading">
      <app-map [markers]="vm.markers" [lat]="vm.userPosition.lat" [lng]="vm.userPosition.lng"></app-map>
    </ng-container>
  `,
  styles: [
    `
      .loading {
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  private readonly playgrounds$ = this.playgroundRepository.query('?top=25&orderby=createdUtc desc');
  private readonly markers$ = this.playgroundRepository.markers();
  private readonly userPosition$ = this.navigationService.getUserPosition();
  readonly vm$ = combineLatest([this.playgrounds$, this.markers$, this.userPosition$]).pipe(
    map(([playgrounds, markers, userPosition]) => ({ playgrounds, markers, userPosition }))
  );

  constructor(private playgroundRepository: PlaygroundRepository, private navigationService: NavigationService) {}
}
