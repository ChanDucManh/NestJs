import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  parent: number;

  @Prop({ type: Number, required: true })
  status: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;;
}

export const CategorySchema = SchemaFactory.createForClass(Category);