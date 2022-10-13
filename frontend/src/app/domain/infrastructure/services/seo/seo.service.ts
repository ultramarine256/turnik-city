import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private metaService: Meta, private titleService: Title) {}

  public homePage() {
    this.titleService.setTitle(seoConst.title);
    this.metaService.updateTag({ name: 'description', content: seoConst.DESCRIPTION });
    this.metaService.updateTag({ name: 'keywords', content: seoConst.KEYWORDS_RU });
    this.metaService.updateTag({ name: 'author', content: seoConst.AUTHOR });
    this.setOGDetails();
  }

  public playgroundPage() {
    this.titleService.setTitle('TurnikCity: Playgrounds');
    this.metaService.addTag({ name: 'description', content: seoConst.DESCRIPTION });
    this.setOGDetails();
  }

  public favoritesPage() {
    this.titleService.setTitle('TurnikCity: Favorite');
    this.metaService.addTag({ name: 'description', content: seoConst.DESCRIPTION });
    this.setOGDetails();
  }

  public aboutPage() {
    this.titleService.setTitle('TurnikCity: About us');
  }

  private setOGDetails() {
    this.metaService.updateTag({ name: 'og:title', content: seoConst.title });
    this.metaService.updateTag({ name: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'og:image', content: 'https://www.turnik.city' });
    this.metaService.updateTag({ name: 'og:url', content: 'https://www.turnik.city/assets/img/favicon-256x256.png' });
  }
}

export const seoConst = {
  title: 'TurnikCity: sport on city streets',
  KEYWORDS_RU:
    'workout, воркаут, гетто, ghetto, фитнес, fitness, street, уличный спорт, дворовый спорт, гимнастика, турники, брусья, рукоходы, отжимания, подтягивания, приседания, выпады, pushups, pullups, dips, bars, barbarians, bartendaz, hannibal for king, zef, jude, beast, ганнибал, денис минин, ether, punisher, тренировочные площадки, совместные тренировки, выходы силой, muscle ups, разряды по street workout, barstylers, дворовый спорт, 10 районов, передний вис, задний вис',
  DESCRIPTION: 'Карта турников и спортивных площадок по всему миру. Занятия спортом в разных городах и странах.',
  AUTHOR: 'Evgeny Platonov',
};
