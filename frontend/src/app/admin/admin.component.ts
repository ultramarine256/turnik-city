import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AsyncState,
  createAsyncState,
  isSuccess,
  toAsyncState,
} from '@ngneat/loadoff';
import {
  combineLatest,
  concatMap,
  filter,
  map,
  merge,
  Observable,
  scan,
  Subject,
} from 'rxjs';
import { Playground } from '../domain/playground/playgorund';
import { AdminService } from './admin.service';
import { Action, assertNever } from './util';

enum PlaygroundAction {
  Update = 'Update',
  Delete = 'Delete',
}

type PlaygroundOperation = Action<Playground, PlaygroundAction>;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private actionDispatcher = new Subject<PlaygroundOperation>();
  private actionDispatcher$ = this.actionDispatcher.asObservable();

  selectedPlayground: Playground | undefined;

  private playgroundsData$ = this.adminService
    .playgrounds()
    .pipe(toAsyncState());

  private playgroundsMutations$ = combineLatest([
    this.playgroundsData$.pipe(filter(isSuccess)),
    this.actionDispatcher$.pipe(
      concatMap((operaton) => this.execute(operaton))
    ),
  ]).pipe(
    scan((acc, [playgrounds, result]) => {
      return {
        ...acc,
        ...result,
        res: this.update(acc.res || playgrounds.res, result.res),
      };
    }, createAsyncState<Playground[]>())
  );

  private playgrounds$ = merge(
    this.playgroundsData$,
    this.playgroundsMutations$
  );

  readonly vm$ = combineLatest([this.playgrounds$]).pipe(
    map(([playgrounds]) => ({ playgrounds }))
  );

  constructor(private adminService: AdminService) {}

  private execute(
    operation: PlaygroundOperation
  ): Observable<AsyncState<PlaygroundOperation>> {
    const playground = operation.item;
    switch (operation.action) {
      case PlaygroundAction.Update:
        return this.adminService.update(playground).pipe(
          map((playground) => ({
            item: playground,
            action: operation.action,
            onSuccess: operation.onSuccess,
          })),
          toAsyncState()
        );
      case PlaygroundAction.Delete:
        return this.adminService.remove(playground._id).pipe(
          map((_) => ({
            item: playground,
            action: operation.action,
          })),
          toAsyncState()
        );
      default:
        return assertNever(operation.action);
    }
  }

  private update(
    playgrounds: Playground[],
    operation: PlaygroundOperation | undefined
  ): Playground[] {
    if (!operation) {
      return playgrounds;
    }
    switch (operation.action) {
      case PlaygroundAction.Update:
        this.selectedPlayground = operation.item;
        if (operation.onSuccess) {
          operation.onSuccess();
        }
        return playgrounds.map((playground) =>
          playground._id === operation.item._id ? operation.item : playground
        );
      case PlaygroundAction.Delete:
        this.selectedPlayground = undefined;
        return playgrounds.filter(
          (playground) => playground._id !== operation.item._id
        );
      default:
        return assertNever(operation.action);
    }
  }

  onSelectedPlaygroundChange(playground: Playground) {
    this.selectedPlayground = playground;
  }

  onUpdate(data: { playground: Playground; onSuccess: () => void }) {
    this.actionDispatcher.next({
      action: PlaygroundAction.Update,
      item: data.playground,
      onSuccess: data.onSuccess,
    });
  }

  onDelete(playground: Playground) {
    this.actionDispatcher.next({
      item: playground,
      action: PlaygroundAction.Delete,
    });
  }

  onClosed() {
    this.selectedPlayground = undefined;
  }
}
