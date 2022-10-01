import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudRepository } from '../crud.repository';
import { PlaygroundDto } from './dtos/playground.dto';

@Injectable()
export class PlaygroundRepository extends CrudRepository<PlaygroundDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient, PlaygroundDto, 'playground');
  }
}
