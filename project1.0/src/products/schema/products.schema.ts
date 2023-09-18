import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  summary: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: Number, required: true})
  price: number;

  @Prop({ type: Number, required: true})
  user_id: number;

  @Prop({ type: Number, required: true})
  status: number;

  @Prop({ type: Number, required: true})
  product_categories_id: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);