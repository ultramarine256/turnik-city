import { Injectable } from '@angular/core';
import { CrudRepository } from '../crud.repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto, UserProfileDto } from './dtos/user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserRepository extends CrudRepository<UserDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'user');
  }

  override query(query: string = '', reset: boolean = false): Observable<UserDto[]> {
    return super
      .query(query, reset)
      .pipe(
        map(r => r.map(o => ({ ...o, imageUrl: o.imageUrl == null ? this.generateBackground(o.fullName, 0.4) : null })))
      );
  }

  userProfile(slug: string): Observable<UserProfileDto> {
    return this.httpClient
      .get<UserProfileDto>(`${this.apiBaseUrl}/${this.pathName}/profile/${slug}`)
      .pipe(map(r => ({ ...r, imageUrl: r.imageUrl == null ? this.generateBackground(r.fullName, 0.4) : null })));
  }
}
