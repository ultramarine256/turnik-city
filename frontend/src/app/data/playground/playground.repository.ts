import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudRepository } from '../crud.repository';
import { PlaygroundDto } from './dtos/playground.dto';
import { Observable } from 'rxjs';
import { MarkerDto } from './dtos/marker.dto';

@Injectable()
export class PlaygroundRepository extends CrudRepository<PlaygroundDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'playground');
  }

  markers(): Observable<MarkerDto[]> {
    return this.httpClient.get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`);
  }
}
