import { inject, Injectable } from '@angular/core';
import { BaseRepository } from '../base.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpDetailsDto } from './dtos/ip-details.dto';
import { CountersDto, FreshMemberDto, FreshPlaygroundDto } from './dtos/counters.dto';
import { QueryClientService, UseQuery } from '@ngneat/query';

@Injectable()
export class CommonRepository extends BaseRepository {
  private queryClient = inject(QueryClientService);
  private useQuery = inject(UseQuery);

  constructor(http: HttpClient) {
    super(http);
  }

  getPlaygrounds() {
    return this.useQuery(['doodle'], () => {
      return this.httpClient.get<IpDetailsDto[]>('https://api.turnik.city/playground/');
    });
  }

  ipDetails(): Observable<IpDetailsDto> {
    return this.httpClient.get<IpDetailsDto>(`https://ipapi.co/json`).pipe(map(_ => new IpDetailsDto().mapFromJson(_)));
  }

  counters(): Observable<CountersDto> {
    return this.httpClient.get<CountersDto>(`${this.apiBaseUrl}/common/counters`);
  }

  newMembers(): Observable<FreshMemberDto[]> {
    return this.httpClient
      .get<FreshMemberDto[]>(`${this.apiBaseUrl}/common/new-members`)
      .pipe(map(r => r.map(o => ({ ...o, createdUtc: new Date(o.createdUtc) }))));
  }

  newPlaygrounds(): Observable<FreshPlaygroundDto[]> {
    return this.httpClient
      .get<FreshPlaygroundDto[]>(`${this.apiBaseUrl}/common/new-playgrounds`)
      .pipe(map(r => r.map(o => ({ ...o, createdUtc: new Date(o.createdUtc) }))));
  }
}
