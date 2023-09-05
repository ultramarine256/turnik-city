import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

export type DATA_STATE = 'loading' | 'loaded' | 'updating' | 'not-found';

export const APP_CONST = {
  // app title
  APP_TITLE: 'TurnikCity',

  // theming
  DEFAULT_THEME_COLOR: '#3f51b5',

  // images
  LOGIN_LOGO: '/assets/img/logo/logo__login-1.png',
};

export const SOCIAL: { icon: IconName; prefix: IconPrefix; href: string }[] = [
  {
    icon: 'instagram',
    prefix: 'fab',
    href: 'https://www.instagram.com/los_strong90',
  },
  {
    icon: 'github',
    prefix: 'fab',
    href: 'https://github.com/ultramarine256/turnik-city',
  },
];
