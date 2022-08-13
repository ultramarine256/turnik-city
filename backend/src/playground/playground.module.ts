import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { PlaygroundController } from "./playground.controller";

@Module({
  providers: [PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
