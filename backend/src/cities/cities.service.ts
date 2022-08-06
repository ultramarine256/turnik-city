import { Injectable } from '@nestjs/common';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { pipe } from 'fp-ts/function';

type City = {
  id: string;
  title: string;
  country: string;
};

const CITIES = [
  {
    id: '1',
    title: 'Kiev',
    country: 'Ukraine',
  },
  {
    id: '2',
    title: 'Kharkov',
    country: 'Ukraine',
  },
  {
    id: '3',
    title: 'Lviv',
    country: 'Ukraine',
  },
];

@Injectable()
export class CitiesService {
  getCitiesByQuery(query: string): City[] {
    if (!S.isEmpty(query)) {
      return CITIES;
    }

    const searchQuery = pipe(query, S.toLowerCase);
    return (
      A.filter<City>((city) =>
        S.startsWith(S.toLowerCase(city.title))(searchQuery),
      ),
      CITIES
    );
  }
}
