import { Controller, Get, Param } from "@nestjs/common";
import { PlaygroundService } from "./playground.service";

@Controller('playground')
export class PlaygroundController {

  constructor(private playgroundService: PlaygroundService) {}

  @Get('')
  async places(@Param() params) {
    return await this.playgroundService.findAll();
  }
}
