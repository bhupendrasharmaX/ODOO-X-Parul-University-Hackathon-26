import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  coverImage: string;
  startDate: Date;
  endDate: Date;
  travelType: string;
  budget: number;
  tags: string[];
  isPublic: boolean;
  shareCode: string;
  status: 'planning' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

const tripSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelType: { type: String, default: 'adventure' },
  budget: { type: Number, default: 0 },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  shareCode: { type: String, unique: true },
  status: { type: String, enum: ['planning', 'ongoing', 'completed', 'cancelled'], default: 'planning' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITrip>('Trip', tripSchema);
