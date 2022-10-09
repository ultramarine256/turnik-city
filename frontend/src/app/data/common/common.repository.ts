import { Injectable } from '@angular/core';
import { BaseRepository } from '../base.repository';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpDetailsDto } from './dtos/ip-details.dto';

@Injectable()
export class CommonRepository extends BaseRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ipDetails(): Observable<IpDetailsDto> {
    return this.httpClient.get<IpDetailsDto>(`https://ipapi.co/json`).pipe(map(_ => new IpDetailsDto().mapFromJson(_)));
  }
}
