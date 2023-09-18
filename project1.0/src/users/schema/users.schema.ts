import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: String, required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);