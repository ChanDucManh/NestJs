import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bill extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: String, required: true })
  code: number;

  @Prop({ type: Number, required: true })
  user_id: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ type: Number, required: true })
  payment_total: number;

  @Prop({ type: Number, required: true })
  fullfillment_status: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
  
  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

}

export const BillSchema = SchemaFactory.createForClass(Bill);