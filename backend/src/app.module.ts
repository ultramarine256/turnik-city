import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { PlacesModule } from './places/places.module';
import { PlaygroundModule } from "./playground/playground.module";

@Module({
  imports: [CitiesModule, PlacesModule, PlaygroundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
