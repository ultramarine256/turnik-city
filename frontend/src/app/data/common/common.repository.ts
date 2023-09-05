import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpDetailsDto } from './dtos/ip-details.dto';
import { BaseRepository, generateBackground } from '../base.repository';
import { CountersDto, FreshMemberDto, FreshPlaygroundDto } from './dtos/counters.dto';
import { query, QueryOutput } from 'rx-query';

@Injectable({
  providedIn: 'root',
})
export class CommonRepository extends BaseRepository {
  constructor(http: HttpClient) {
    super(http);
  }

  ipDetails(): Observable<QueryOutput<IpDetailsDto>> {
    return query('ip-details', () =>
      this.httpClient.get<IpDetailsDto>(`https://ipapi.co/json`).pipe(map(x => new IpDetailsDto().mapFromJson(x))),
    );
  }

  counters(): Observable<CountersDto> {
    return this.httpClient.get<CountersDto>(`${this.apiBaseUrl}/common/counters`);
  }

  newMembers(): Observable<FreshMemberDto[]> {
    return this.httpClient.get<FreshMemberDto[]>(`${this.apiBaseUrl}/common/new-members`).pipe(
      map(r => r.map(o => ({ ...o, createdUtc: new Date(o.createdUtc) }))),
      map(r => r.map(o => ({ ...o, imageUrl: o.imageUrl == null ? generateBackground(o.fullName, 0.4) : null }))),
    );
  }

  newPlaygrounds(): Observable<FreshPlaygroundDto[]> {
    return this.httpClient
      .get<FreshPlaygroundDto[]>(`${this.apiBaseUrl}/common/new-playgrounds`)
      .pipe(map(r => r.map(o => ({ ...o, createdUtc: new Date(o.createdUtc) }))));
  }
}
