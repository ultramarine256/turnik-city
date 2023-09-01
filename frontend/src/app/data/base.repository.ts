import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export abstract class BaseRepository {
  protected apiBaseUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }
}

export function generateBackground(title: string, fontSize: number = 0.25, size: number = 128) {
  const colors = ['366a25', '2489ce', '8d6d64', 'bc3217', 'ee6b1c', 'aa45b9', 'bd115c', '2197a6', 'f18eb1', '5ad1e0'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://ui-avatars.com/api/?name=${title}&size=128&background=${color}&color=fff&font-size=${fontSize}`;
}
