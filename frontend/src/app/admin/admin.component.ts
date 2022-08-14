import { Component } from '@angular/core';
import { AsyncState, createAsyncState, toAsyncState } from '@ngneat/loadoff';
import {
  combineLatest,
  concatMap,
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
})
export class AdminComponent {
  private actionDispatcher = new Subject<PlaygroundOperation>();
  private actionDispatcher$ = this.actionDispatcher.asObservable();

  selectedPlayground: Playground | undefined;

  private readonly playgrounds$ = merge(
    this.adminService.playgrounds().pipe(toAsyncState()),
    this.actionDispatcher$.pipe(
      concatMap((operation) => this.execute(operation))
    )
  ).pipe(
    scan((acc, value) => {
      if (Array.isArray(value.res)) {
        return {
          ...acc,
          ...value,
          res: value.res,
        };
      } else if (value.res) {
        return {
          ...acc,
          ...value,
          res: this.update(
            acc.res as Playground[],
            value.res as PlaygroundOperation
          ),
        };
      }
      return {
        ...acc,
        ...value,
        res: acc.res,
      };
    }, createAsyncState<Playground[]>())
  );

  readonly vm$ = combineLatest([this.playgrounds$]).pipe(
    map(([playgrounds]) => ({ playgrounds }))
  );

  constructor(private adminService: AdminService) {}

  execute(
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

  update(
    playgrounds: Playground[],
    operation: PlaygroundOperation
  ): Playground[] {
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
