import { Injectable } from '@angular/core';
import { BaseRepository } from '../base.repository';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpDetailsDto } from './dtos/ip-details.dto';
import { CountersDto } from './dtos/counters.dto';

@Injectable()
export class CommonRepository extends BaseRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ipDetails(): Observable<IpDetailsDto> {
    return this.httpClient.get<IpDetailsDto>(`https://ipapi.co/json`).pipe(map(_ => new IpDetailsDto().mapFromJson(_)));
  }

  counters(): Observable<CountersDto> {
    const mock = new CountersDto({
      playgrounds: 2174,
      users: 2,
      cities: 17,
      likes: 1,
    });
    return of(mock);
  }
}
