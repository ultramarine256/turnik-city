import { Injectable } from '@angular/core';
import { CrudRepository } from '../crud.repository';
import { HttpClient } from '@angular/common/http';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository extends CrudRepository<UserDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'user');
  }
}
