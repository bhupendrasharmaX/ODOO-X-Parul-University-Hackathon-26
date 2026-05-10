import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  name: string;
  country: string;
  region: string;
  image: string;
  popularity: number;
  averageCost: number;
  description: string;
}

const citySchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String },
  image: { type: String },
  popularity: { type: Number, default: 0 },
  averageCost: { type: Number, default: 0 },
  description: { type: String }
});

export default mongoose.model<ICity>('City', citySchema);
