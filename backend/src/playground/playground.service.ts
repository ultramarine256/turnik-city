import { Injectable } from "@nestjs/common";
import { Playground } from "../domain/types";
import { PlaygroundModel } from "../data/playground.model";

@Injectable()
export class PlaygroundService {
  async findAll(): Promise<Playground[]> {
    return PlaygroundModel.find();
  }
}
