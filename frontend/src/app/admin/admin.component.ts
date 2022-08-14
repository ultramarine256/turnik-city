import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toAsyncState } from '@ngneat/loadoff';
import { combineLatest, map } from 'rxjs';
import { Playground } from '../domain/playground/playgorund';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly playgrounds$ = this.adminService
    .playgrounds()
    .pipe(toAsyncState());

  readonly vm$ = combineLatest([this.playgrounds$]).pipe(
    map(([playgrounds]) => ({ playgrounds }))
  );

  selectedPlayground: Playground | undefined;

  constructor(private adminService: AdminService) {}

  onSelectedPlaygroundChange(playground: Playground) {
    console.log('Selected', playground);
    this.selectedPlayground = playground;
  }

  onClosed() {
    this.selectedPlayground = undefined;
  }
}
