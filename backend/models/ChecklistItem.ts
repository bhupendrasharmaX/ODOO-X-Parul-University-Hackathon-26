import mongoose, { Schema, Document } from 'mongoose';

export interface IChecklistItem extends Document {
  tripId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  isPacked: boolean;
}

const checklistItemSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'general' },
  isPacked: { type: Boolean, default: false }
});

export default mongoose.model<IChecklistItem>('ChecklistItem', checklistItemSchema);
