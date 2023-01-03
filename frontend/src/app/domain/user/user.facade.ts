import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlaygroundDto } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  trainingPlaygrounds(email: string): Observable<PlaygroundDto[]> {
    return of([]);
  }
}
