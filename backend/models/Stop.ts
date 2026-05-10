import mongoose, { Schema, Document } from 'mongoose';

export interface IStop extends Document {
  tripId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  arrivalDate: Date;
  departureDate: Date;
  order: number;
  notes: string;
}

const stopSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  order: { type: Number, required: true },
  notes: { type: String }
});

export default mongoose.model<IStop>('Stop', stopSchema);
