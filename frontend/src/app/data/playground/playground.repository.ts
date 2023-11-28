import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments';
import { CrudRepository } from '../crud.repository';
import { PlaygroundDto } from './dtos/playground.dto';
import { MarkerDto } from './dtos/marker.dto';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundRepository extends CrudRepository<PlaygroundDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'playground');
  }

  markers(): Observable<MarkerDto[]> {
    return this.httpClient.get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlaygroundRxQueryRepository {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly pathName = `playground`;

  constructor(private httpClient: HttpClient) {}

  markers(): Observable<MarkerDto[]> {
    return this.httpClient.get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`);
  }
}

export const PLAYGROUND_QUERY_KEY = `markers-new`;
