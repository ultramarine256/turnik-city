import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from 'src/cities/cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  cities(@Query() query) {
    return this.citiesService.getCitiesByQuery(query?.search || '');
  }
}
