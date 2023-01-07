import { Injectable } from '@angular/core';
import { CrudRepository } from '../crud.repository';
import { HttpClient } from '@angular/common/http';
import { UserDto, UserProfileDto } from './dtos/user.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserRepository extends CrudRepository<UserDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'user');
  }

  userProfile(slug: string): Observable<UserProfileDto> {
    return this.httpClient.get<UserProfileDto>(`${this.apiBaseUrl}/${this.pathName}/profile/${slug}`);
  }
}
