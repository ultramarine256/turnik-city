import { Injectable } from '@nestjs/common';

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
  async getCitiesByQuery(query: string): Promise<City[]> {
    // TODO: refactor with fp-ts
    if (!query.trim()) {
      return Promise.resolve(CITIES);
    }
    return Promise.resolve(
      CITIES.filter((city) =>
        city.title.toLowerCase().startsWith(query.toLocaleLowerCase()),
      ),
    );
  }
}
