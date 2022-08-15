import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AsyncState,
  createAsyncState,
  isSuccess,
  toAsyncState,
} from '@ngneat/loadoff';
import {
  BehaviorSubject,
  combineLatest,
  exhaustMap,
  filter,
  map,
  merge,
  Observable,
  scan,
  shareReplay,
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
  private fetchPlaygrounds = new BehaviorSubject(1);
  private fetchPlaygrounds$ = this.fetchPlaygrounds.asObservable();

  selectedPlayground: Playground | undefined;

  private playgroundsData$ = this.fetchPlaygrounds$
    .pipe(
      exhaustMap((page) =>
        this.adminService.playgrounds(page).pipe(toAsyncState())
      )
    )
    .pipe(
      scan(
        (savedPlaygrounds, newPlaygrounds) => ({
          ...savedPlaygrounds,
          ...newPlaygrounds,
          res: newPlaygrounds.res || savedPlaygrounds.res,
        }),
        createAsyncState<Playground[]>()
      ),
      shareReplay(1)
    );

  private playgroundsUpdates$ = combineLatest([
    this.playgroundsData$.pipe(filter(isSuccess)),
    this.actionDispatcher$.pipe(
      exhaustMap((operaton) => this.execute(operaton))
    ),
  ]).pipe(
    scan(
      (savedPlaygrounds, [newPlaygrounds, operationResult]) => ({
        ...savedPlaygrounds,
        ...operationResult,
        res: this.update(
          savedPlaygrounds.res || newPlaygrounds.res,
          operationResult.res
        ),
      }),
      createAsyncState<Playground[]>()
    )
  );

  private playgrounds$ = merge(this.playgroundsData$, this.playgroundsUpdates$);

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

  onLoadMore() {
    this.fetchPlaygrounds.next(this.fetchPlaygrounds.getValue() + 1);
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
