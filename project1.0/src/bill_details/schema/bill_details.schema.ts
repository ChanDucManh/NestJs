import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BillDetails extends Document {
  @Prop({ type: Number, required: true,unique: true})
  id: number;

  @Prop({ type: Number, required: true })
  product_id: number;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ type: Number, required: true })
  bill_id: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
  
  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

}

export const BillDetailsSchema = SchemaFactory.createForClass(BillDetails);