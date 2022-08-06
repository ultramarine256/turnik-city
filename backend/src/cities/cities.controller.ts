import { Controller, Get, Query } from '@nestjs/common';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { CitiesService } from 'src/cities/cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  cities(@Query() query) {
    const search = pipe(
      query?.search,
      O.fromNullable,
      O.getOrElse(() => ''),
    );
    return this.citiesService.getCitiesByQuery(search);
  }
}
