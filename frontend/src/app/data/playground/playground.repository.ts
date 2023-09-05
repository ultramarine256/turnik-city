import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mutateOptimistic, prefetch, query, QueryOutput, refreshQuery } from 'rx-query';
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

  markers(): Observable<QueryOutput<MarkerDto[]>> {
    return query(`markers`, () => this.httpClient.get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlaygroundRxQueryRepository {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly pathName = `playground`;

  constructor(private httpClient: HttpClient) {}

  markers(): Observable<QueryOutput<MarkerDto[]>> {
    return query(PLAYGROUND_QUERY_KEY, () => this.httpClient.get<MarkerDto[]>(`${this.apiBaseUrl}/${this.pathName}/markers`));
  }

  mutate() {
    mutateOptimistic<MarkerDto[]>(PLAYGROUND_QUERY_KEY, []);
  }

  prefetch() {
    return prefetch(PLAYGROUND_QUERY_KEY, this.markers);
  }

  refresh() {
    refreshQuery(PLAYGROUND_QUERY_KEY);
  }
}

export const PLAYGROUND_QUERY_KEY = `markers-new`;
