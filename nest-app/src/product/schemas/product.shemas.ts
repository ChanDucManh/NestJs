import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name : string;
    @Prop()
    price : Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)