import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private metaService: Meta, private titleService: Title) {}

  public homePage() {
    this.titleService.setTitle(seoConst.title);
    this.metaService.updateTag({ name: 'description', content: seoConst.description });
    this.metaService.updateTag({ name: 'keywords', content: seoConst.keywords_ru });
    this.metaService.updateTag({ name: 'author', content: seoConst.author });
    this.setOGDetails();
  }

  public playgroundPage() {
    this.titleService.setTitle('TurnikCity: Playgrounds');
    this.metaService.addTag({ name: 'description', content: seoConst.description });
    this.setOGDetails();
  }

  public favoritesPage() {
    this.titleService.setTitle('TurnikCity: Favorite');
    this.metaService.addTag({ name: 'description', content: seoConst.description });
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
  keywords_ru:
    'workout, воркаут, гетто, ghetto, фитнес, fitness, street, уличный спорт, дворовый спорт, гимнастика, турники, брусья, рукоходы, отжимания, подтягивания, приседания, выпады, pushups, pullups, dips, bars, barbarians, bartendaz, hannibal for king, zef, jude, beast, ганнибал, денис минин, ether, punisher, тренировочные площадки, совместные тренировки, выходы силой, muscle ups, разряды по street workout, barstylers, дворовый спорт, 10 районов, передний вис, задний вис',
  description: 'Карта турников и спортивных площадок по всему миру. Занятия спортом в разных городах и странах.',
  author: 'Evgeny Platonov',
};

export const seo = {
  ru: {
    // common
    title: 'TurnikCity',
    description: 'Карта турников и спортивных площадок в твоем городе. Спорт городских улиц.',
    author: 'Evgeny Platonov',
    keywords: [
      'карта турников',
      'карта спортивных площадок',
      'площадки для воркаута',
      'уличный спорт',
      'дворовый спорт',
      'турники',
      'брусья',
      'отжимания',
      'приседания',
      'тренировочные площадки',
      'совместные тренировки',
      'воркаут',
    ],

    // pages
    home: {
      title: 'TurnikCity: спорт городских улиц',
      description: 'Карта турников и спортивных площадок в твоем городе.',
      keywords: [
        // common
        'спортивные площадки',
        'спортивные площадки рядом',
        'спортивные площадки рядом со мной',
        'карта воркаут площадок',
        'карта турников',
        'карта спортивных воркаут площадок',
        'гид по основным уличным площадкам',
        'тренажеры на улице',
      ],
    },

    map: {
      title: 'TurnikCity: спорт городских улиц',
      description: 'Карта турников и спортивных площадок',
      keywords: [
        // common
        'спортивные площадки',
        'спортивные площадки рядом',
        'спортивные площадки рядом со мной',
        'карта воркаут площадок',
        'карта турников',
        'карта спортивных воркаут площадок',
        'гид по основным уличным площадкам',
        'тренажеры на улице',

        // kiev
        'спортивные площадки киев',
        'спортивные площадки в центре киева',
        'карта турников киев',
        'площадка для воркаута в городе Киев',
        'карта турников киев',
        'турники Киев Украина',
        'турники и брусья в Киеве',

        // minsk
        'спортивные площадки минск',
        'тренажеры на улице минск',
        'карта спортивных воркаут площадок в минске',
      ],
    },
  },
  en: {
    title: 'TurnikCity: street sports',
    description: 'Calisthenics parks map',
    keywords: [
      'playgrounds map',
      'calisthenics pars map',
      'street sports',
      'horizontal bar',
      'bars',
      'push ups',
      'squats',
      'calisthenics',
      'training grounds',
      'sport together',
      'workout',
    ],
  },
};
