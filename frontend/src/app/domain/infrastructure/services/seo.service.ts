import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private metaService: Meta) {}

  public homePage() {
    this.metaService.updateTag({ name: 'description', content: 'Article Description' });
    this.metaService.updateTag({ name: 'keywords', content: 'HTML, CSS, JavaScript' });
    this.metaService.updateTag({ name: 'author', content: 'Evgeny Platonov' });
  }

  public aboutPage() {}

  public playgroundPage() {
    this.metaService.addTag({ name: 'description', content: 'Article Description' });
  }
}
