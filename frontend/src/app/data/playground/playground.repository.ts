import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudRepository } from '../crud.repository';
import { PlaygroundDto } from './dtos/playground.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarkerDto } from './dtos/marker.dto';
import { BaseRepository } from '../base.repository';

@Injectable()
export class PlaygroundRepository extends CrudRepository<PlaygroundDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, PlaygroundDto, 'playground');
  }

  markers(): Observable<MarkerDto[]> {
    return this.httpClient
      .get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`)
      .pipe(map(items => items.map(r => new MarkerDto().mapFromJson(r))));
  }
}
