import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  profilePhoto: string;
  role: 'user' | 'admin';
  savedDestinations: string[];
  preferences: {
    budget: string;
    travelType: string;
    categories: string[];
  };
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  savedDestinations: [{ type: String }],
  preferences: {
    budget: { type: String, default: 'medium' },
    travelType: { type: String, default: 'leisure' },
    categories: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (this: any) {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
  } catch (err: any) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password as string);
};

export default mongoose.model<IUser>('User', userSchema);
