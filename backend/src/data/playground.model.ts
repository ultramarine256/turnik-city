import { model, Schema } from 'mongoose';
import { Playground } from '../domain/types';

const playgroundSchema = new Schema<Playground>({
  address: { type: String, required: false },
  city: { type: String, required: false },
  title: { type: String, required: false },
  size: { type: String, required: false },
  type: { type: String, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  images: [{ type: String, required: false }],
});

export const PlaygroundModel = model<Playground>('Playground', playgroundSchema);
