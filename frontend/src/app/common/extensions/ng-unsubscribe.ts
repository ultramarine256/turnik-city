import { Subject, takeUntil } from 'rxjs';

export class NgUnsubscribe {
  private ngUnsubscribe = new Subject<void>();
  private x = takeUntil(this.ngUnsubscribe);

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
