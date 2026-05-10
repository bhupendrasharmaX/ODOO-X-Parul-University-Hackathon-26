import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  cityId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  cost: number;
  rating: number;
}

const activitySchema: Schema = new Schema({
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  duration: { type: String },
  cost: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

export default mongoose.model<IActivity>('Activity', activitySchema);
