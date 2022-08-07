import { Controller, Get, Param } from '@nestjs/common';
import { PlacesService } from 'src/places/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get(':city')
  async places(@Param() params) {
    return await this.placesService.places(params.city);
  }
}
