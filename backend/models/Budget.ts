import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  tripId: mongoose.Types.ObjectId;
  transport: number;
  stay: number;
  food: number;
  activities: number;
  miscellaneous: number;
  totalCost: number;
  averagePerDay: number;
}

const budgetSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  transport: { type: Number, default: 0 },
  stay: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  activities: { type: Number, default: 0 },
  miscellaneous: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  averagePerDay: { type: Number, default: 0 }
});

export default mongoose.model<IBudget>('Budget', budgetSchema);
