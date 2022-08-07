import { Injectable } from '@nestjs/common';

export type Place = {
  id: string;
  title: string;
  address: string;
  city: string;
};

@Injectable()
export class PlacesService {
  async places(city: string): Promise<Place[]> {
    return Promise.resolve(
      [
        {
          id: '1',
          title: 'Workout',
          address: 'Address 123',
          city: 'Lviv',
        },
        {
          id: '2',
          title: 'Workout 2',
          address: 'Address 321',
          city: 'Kiev',
        },
        {
          id: '3',
          title: 'Workout 456',
          address: 'Address 987',
          city: 'Kharkov',
        },
        {
          id: '1',
          title: 'Workout',
          address: 'Address 123',
          city: 'Lviv',
        },
        {
          id: '2',
          title: 'Workout 2',
          address: 'Address 321',
          city: 'Kiev',
        },
        {
          id: '3',
          title: 'Workout 456',
          address: 'Address 987',
          city: 'Kharkov',
        },
        {
          id: '1',
          title: 'Workout',
          address: 'Address 123',
          city: 'Lviv',
        },
        {
          id: '2',
          title: 'Workout 2',
          address: 'Address 321',
          city: 'Kiev',
        },
        {
          id: '3',
          title: 'Workout 456',
          address: 'Address 987',
          city: 'Kharkov',
        },
      ].filter((x) => x.city === city),
    );
  }
}
