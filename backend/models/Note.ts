import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  tripId: mongoose.Types.ObjectId;
  stopId?: mongoose.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
}

const noteSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  stopId: { type: Schema.Types.ObjectId, ref: 'Stop' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INote>('Note', noteSchema);
