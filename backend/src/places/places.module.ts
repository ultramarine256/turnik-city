import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';

@Module({
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
