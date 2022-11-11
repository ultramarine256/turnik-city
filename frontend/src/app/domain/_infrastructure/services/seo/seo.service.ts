import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  data: PageMeta[] = [];

  constructor(private metaService: Meta, private titleService: Title, private httpClient: HttpClient) {}

  async updateMetaTags(pageUrl: string) {
    // 1. load seo.json
    if (this.data.length == 0) {
      // TODO: refactor :)
      try {
        this.data = (await this.httpClient.get<PageMeta[]>('/assets/json/seo-ru.json').toPromise()) || [];
      } catch (e) {}
    }

    // 2. apply page meta-tags
    let pageMeta = this.data.find(i => i.url === pageUrl);
    if (pageMeta) {
      const metaData = pageMeta.data;
      this.titleService.setTitle(metaData.title);
      this.metaService.updateTag({ name: 'description', content: metaData.description });
      this.metaService.updateTag({ name: 'keywords', content: metaData.keywords.join(', ') });
      this.metaService.updateTag({ name: 'author', content: 'ultramarine256@gmail.com' });
    }
  }
}

export class PageMeta {
  url: string;
  data: {
    title: string;
    description: string;
    keywords: string[];
  };
}
