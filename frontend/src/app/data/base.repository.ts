import { HttpClient } from '@angular/common/http';
import { setQueryConfig } from 'rx-query';
import { environment } from '../../environments';

export abstract class BaseRepository {
  protected readonly apiBaseUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;

    setQueryConfig({
      refetchOnWindowFocus: false,
      retries: 0,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    });
  }
}
export function generateBackground(title: string, fontSize: number = 0.25, size: number = 128) {
  const colors = ['366a25', '2489ce', '8d6d64', 'bc3217', 'ee6b1c', 'aa45b9', 'bd115c', '2197a6', 'f18eb1', '5ad1e0'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://ui-avatars.com/api/?name=${title}&size=128&background=${color}&color=fff&font-size=${fontSize}`;
}
