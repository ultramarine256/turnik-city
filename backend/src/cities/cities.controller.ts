import { Controller, Get, Query } from '@nestjs/common';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async cities(@Query() query) {
    const search = pipe(
      query?.search,
      O.fromNullable,
      O.getOrElse(() => ''),
    );
    return await this.citiesService.getCitiesByQuery(search);
  }
}
