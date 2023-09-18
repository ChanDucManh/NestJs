import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payments extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: Number, required: true })
  type: number;

  @Prop({ type: Number, required: true })
  bill_id: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);