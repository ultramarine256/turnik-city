import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class BaseRepository {
  protected apiBaseUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }
}
